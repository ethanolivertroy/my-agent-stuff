import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";

const JOB_ROOT = join(homedir(), ".pi", "hf-backups", "jobs");
const DEFAULT_QUARANTINE_ROOT = join(homedir(), ".trash", "hf-uploaded-training-folders");

const SAFE_EXCLUDES = [
  "**/.git/**",
  "**/.DS_Store",
  "**/__pycache__/**",
  "**/.pytest_cache/**",
  "**/.venv/**",
  "**/venv/**",
  "**/.env",
  "**/.env.*",
  "**/*cookie*",
  "**/*Cookie*",
  "**/*token*",
  "**/*Token*",
  "**/*secret*",
  "**/*Secret*",
  "**/*.ovpn",
  "**/auth_session.json",
];

type BackupJob = {
  jobId: string;
  sourcePath: string;
  bucketId: string;
  privateBucket: boolean;
  createdAt: string;
  pid?: number;
  logPath: string;
  scriptPath: string;
  quarantineRoot: string;
  excludes: string[];
  dryRun?: boolean;
};

function ensureDirs() {
  mkdirSync(JOB_ROOT, { recursive: true });
  mkdirSync(DEFAULT_QUARANTINE_ROOT, { recursive: true });
}

function nowStamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function slugify(value: string) {
  return value
    .trim()
    .replace(/^hf:\/\/buckets\//, "")
    .replace(/[^a-zA-Z0-9._/-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function shellQuote(value: string) {
  return `'${value.replace(/'/g, `'"'"'`)}'`;
}

function runHf(args: string[], timeout = 30_000): string {
  return execFileSync("hf", args, { encoding: "utf8", timeout, stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function currentNamespace(): string {
  try {
    const raw = runHf(["auth", "whoami", "--format", "json"]);
    const parsed = JSON.parse(raw);
    if (parsed?.user) return String(parsed.user);
  } catch {
    // fall through
  }
  const envNamespace = process.env.HF_NAMESPACE || process.env.HF_USER;
  if (envNamespace) return envNamespace;
  throw new Error("Could not determine Hugging Face namespace. Run `hf auth login`, or pass --namespace / namespace explicitly, or set HF_NAMESPACE.");
}

function normalizeBucketId(bucketNameOrId: string, namespace?: string): string {
  const cleaned = slugify(bucketNameOrId);
  if (!cleaned) throw new Error("Bucket name cannot be empty");
  if (cleaned.includes("/")) return cleaned;
  return `${namespace || currentNamespace()}/${cleaned}`;
}

function jobDir(jobId: string) {
  return join(JOB_ROOT, jobId);
}

function jobMetaPath(jobId: string) {
  return join(jobDir(jobId), "job.json");
}

function readJob(jobId: string): BackupJob {
  return JSON.parse(readFileSync(jobMetaPath(jobId), "utf8")) as BackupJob;
}

function writeJob(job: BackupJob) {
  mkdirSync(jobDir(job.jobId), { recursive: true });
  writeFileSync(jobMetaPath(job.jobId), JSON.stringify(job, null, 2));
}

function isRunning(pid?: number) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function getBucketInfo(bucketId: string): { ok: boolean; info?: any; error?: string } {
  try {
    const raw = runHf(["buckets", "info", bucketId, "--format", "json"], 60_000);
    return { ok: true, info: JSON.parse(raw) };
  } catch (error: any) {
    return { ok: false, error: error?.message || String(error) };
  }
}

function getJobStatus(job: BackupJob) {
  const dir = jobDir(job.jobId);
  const done = existsSync(join(dir, "done"));
  const failed = existsSync(join(dir, "failed"));
  const running = !done && !failed && isRunning(job.pid);
  const logMtime = existsSync(job.logPath) ? statSync(job.logPath).mtime.toISOString() : undefined;
  const bucket = getBucketInfo(job.bucketId);
  let state = "pending";
  if (done) state = "done";
  else if (failed) state = "failed";
  else if (running) state = "running";
  else state = "stopped";
  return { ...job, state, running, done, failed, logMtime, bucket: bucket.info, bucketError: bucket.error };
}

function listJobs() {
  ensureDirs();
  return readdirSync(JOB_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(JOB_ROOT, d.name, "job.json")))
    .map((d) => readJob(d.name))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

function makeScript(job: BackupJob) {
  const excludes = job.excludes.map((p) => `  ${shellQuote(p)}`).join("\n");
  const createPrivate = job.privateBucket ? "--private" : "";
  return `#!/usr/bin/env bash
set -euo pipefail
JOB_DIR=${shellQuote(jobDir(job.jobId))}
LOG=${shellQuote(job.logPath)}
SRC=${shellQuote(job.sourcePath)}
BUCKET=${shellQuote(job.bucketId)}
DRY_RUN=${job.dryRun ? "1" : "0"}
EXCLUDES=(
${excludes}
)
{
  echo "================================================================================"
  date
  echo "Job: ${job.jobId}"
  echo "Source: $SRC"
  echo "Bucket: hf://buckets/$BUCKET"
  echo "Dry run: ${job.dryRun ? "true" : "false"}"
  du -sh "$SRC" || true
  hf buckets create "$BUCKET" ${createPrivate} --exist-ok --format json
  sync_args=()
  if [[ "$DRY_RUN" == "1" ]]; then
    sync_args+=(--dry-run)
  fi
  for pattern in "\${EXCLUDES[@]}"; do
    sync_args+=(--exclude "$pattern")
  done
  hf buckets sync "$SRC" "hf://buckets/$BUCKET" "\${sync_args[@]}"
  hf buckets info "$BUCKET" --format json > "$JOB_DIR/bucket-info.json" || true
  hf buckets list "$BUCKET" -R --quiet > "$JOB_DIR/remote-files.txt" || true
  date
  echo "DONE ${job.bucketId}"
  touch "$JOB_DIR/done"
} > "$LOG" 2>&1 || {
  code=$?
  echo "FAILED ${job.bucketId} exit=$code" >> "$LOG" || true
  echo "$code" > "$JOB_DIR/failed"
  exit "$code"
}
`;
}

function startBackup(params: {
  sourcePath: string;
  bucketName: string;
  namespace?: string;
  privateBucket?: boolean;
  dryRun?: boolean;
  extraExcludes?: string[];
  quarantineRoot?: string;
}) {
  ensureDirs();
  const sourcePath = resolve(params.sourcePath.replace(/^~(?=$|\/)/, homedir()));
  if (!existsSync(sourcePath)) throw new Error(`Source path does not exist: ${sourcePath}`);
  if (!statSync(sourcePath).isDirectory()) throw new Error(`Source path must be a directory for hf buckets sync: ${sourcePath}`);
  const bucketId = normalizeBucketId(params.bucketName, params.namespace);
  const jobId = `${nowStamp()}-${slugify(bucketId).replace(/\//g, "-")}`;
  const dir = jobDir(jobId);
  mkdirSync(dir, { recursive: true });
  const logPath = join(dir, "upload.log");
  const scriptPath = join(dir, "run.sh");
  const job: BackupJob = {
    jobId,
    sourcePath,
    bucketId,
    privateBucket: params.privateBucket !== false,
    createdAt: new Date().toISOString(),
    logPath,
    scriptPath,
    quarantineRoot: params.quarantineRoot ? resolve(params.quarantineRoot.replace(/^~/, homedir())) : DEFAULT_QUARANTINE_ROOT,
    excludes: [...SAFE_EXCLUDES, ...(params.extraExcludes || [])],
    dryRun: Boolean(params.dryRun),
  };
  writeJob(job);
  writeFileSync(scriptPath, makeScript(job), { mode: 0o755 });
  const child = spawn("/bin/bash", [scriptPath], { detached: true, stdio: "ignore" });
  child.unref();
  job.pid = child.pid;
  writeJob(job);
  return getJobStatus(job);
}

function quarantineJob(jobId: string) {
  const job = readJob(jobId);
  const status = getJobStatus(job);
  if (status.state !== "done") throw new Error(`Refusing to quarantine ${jobId}: job state is ${status.state}`);
  const fileCount = Number(status.bucket?.total_files || 0);
  const size = Number(status.bucket?.size || 0);
  if (!status.bucket?.private) throw new Error(`Refusing to quarantine ${jobId}: bucket is not private`);
  if (fileCount <= 0 || size <= 0) throw new Error(`Refusing to quarantine ${jobId}: remote bucket appears empty`);
  if (!existsSync(job.sourcePath)) return { alreadyMissing: true, jobId, sourcePath: job.sourcePath };

  mkdirSync(job.quarantineRoot, { recursive: true });
  const safe = slugify(job.bucketId).replace(/\//g, "-") || basename(job.sourcePath);
  let dest = join(job.quarantineRoot, safe);
  if (existsSync(dest)) dest = `${dest}-${Date.now()}`;
  mkdirSync(dirname(dest), { recursive: true });
  renameSync(job.sourcePath, dest);
  writeFileSync(join(jobDir(jobId), "quarantined.json"), JSON.stringify({ sourcePath: job.sourcePath, quarantinePath: dest, at: new Date().toISOString() }, null, 2));
  return { jobId, sourcePath: job.sourcePath, quarantinePath: dest, bucketId: job.bucketId, fileCount, size };
}

function parseArgs(args: string) {
  const tokens: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(args))) tokens.push(m[1] ?? m[2] ?? m[3]);
  const opts: Record<string, string | boolean> = {};
  const positional: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.startsWith("--")) {
      const key = t.slice(2);
      const next = tokens[i + 1];
      if (!next || next.startsWith("--")) opts[key] = true;
      else opts[key] = tokens[++i];
    } else {
      positional.push(t);
    }
  }
  return { positional, opts };
}

function textResult(text: string, details: any = {}) {
  return { content: [{ type: "text" as const, text }], details };
}

export default function hfBucketsExtension(pi: ExtensionAPI) {
  pi.registerTool({
    name: "hf_safe_bucket_backup",
    label: "HF Safe Bucket Backup",
    description: "Start a detached, private Hugging Face bucket directory sync with secret-safe excludes and job tracking.",
    promptSnippet: "Start safe private Hugging Face bucket backups for local folders.",
    promptGuidelines: [
      "Use hf_safe_bucket_backup for Hugging Face bucket backups instead of raw hf buckets sync when the user wants safe private backup behavior.",
      "Use hf_backup_status after starting hf_safe_bucket_backup to monitor completion before quarantining local files.",
      "Use hf_quarantine_uploaded only after hf_backup_status reports a completed private bucket with nonzero files.",
    ],
    parameters: Type.Object({
      sourcePath: Type.String({ description: "Local directory to upload." }),
      bucketName: Type.String({ description: "Bucket name or namespace/bucket id. If no namespace is provided, current hf auth user is used." }),
      namespace: Type.Optional(Type.String({ description: "Optional Hugging Face namespace/user/org." })),
      privateBucket: Type.Optional(Type.Boolean({ description: "Create bucket as private. Default true." })),
      dryRun: Type.Optional(Type.Boolean({ description: "Plan without uploading." })),
      quarantineRoot: Type.Optional(Type.String({ description: "Where verified local sources should later be quarantined." })),
      extraExcludes: Type.Optional(Type.Array(Type.String(), { description: "Additional hf sync exclude globs." })),
    }),
    async execute(_toolCallId, params: any) {
      const status = startBackup(params);
      return textResult(
        `Started HF bucket backup job ${status.jobId}\nBucket: hf://buckets/${status.bucketId}\nPID: ${status.pid}\nLog: ${status.logPath}`,
        status,
      );
    },
  });

  pi.registerTool({
    name: "hf_backup_status",
    label: "HF Backup Status",
    description: "Check status of safe Hugging Face bucket backup jobs started by hf_safe_bucket_backup or /hf-backup.",
    promptSnippet: "Check safe Hugging Face backup jobs and bucket verification status.",
    parameters: Type.Object({ jobId: Type.Optional(Type.String({ description: "Specific job id. Omit for all jobs." })) }),
    async execute(_toolCallId, params: any) {
      const jobs = params.jobId ? [readJob(params.jobId)] : listJobs();
      const statuses = jobs.map(getJobStatus);
      const lines = statuses.map((s) => `${s.jobId}: ${s.state} bucket=${s.bucketId} files=${s.bucket?.total_files ?? "?"} size=${s.bucket?.size ?? "?"} log=${s.logPath}`);
      return textResult(lines.join("\n") || "No HF backup jobs found.", { jobs: statuses });
    },
  });

  pi.registerTool({
    name: "hf_quarantine_uploaded",
    label: "HF Quarantine Uploaded",
    description: "Move a completed and verified HF backup source folder to local quarantine.",
    promptSnippet: "Quarantine local folders only after verified private HF bucket upload completion.",
    parameters: Type.Object({ jobId: Type.String({ description: "Completed backup job id to quarantine." }) }),
    async execute(_toolCallId, params: any) {
      const result = quarantineJob(params.jobId);
      return textResult(JSON.stringify(result, null, 2), result);
    },
  });

  pi.registerCommand("hf-backup", {
    description: "Safely upload a path to a private Hugging Face bucket: /hf-backup <path> --bucket <name> [--namespace <ns>] [--dry-run]",
    handler: async (args, ctx) => {
      try {
        const { positional, opts } = parseArgs(args);
        const sourcePath = positional.join(" ");
        const bucketName = String(opts.bucket || opts.b || "");
        if (!sourcePath || !bucketName) {
          ctx.ui.notify("Usage: /hf-backup <path> --bucket <name> [--namespace <ns>] [--dry-run]", "error");
          return;
        }
        const status = startBackup({
          sourcePath,
          bucketName,
          namespace: typeof opts.namespace === "string" ? opts.namespace : undefined,
          dryRun: Boolean(opts["dry-run"] || opts.dryRun),
        });
        ctx.ui.notify(`Started ${status.jobId}; log: ${status.logPath}`, "info");
      } catch (error: any) {
        ctx.ui.notify(error?.message || String(error), "error");
      }
    },
  });

  pi.registerCommand("hf-status", {
    description: "Show safe Hugging Face backup job status: /hf-status [jobId]",
    handler: async (args, ctx) => {
      try {
        const jobId = args.trim();
        const jobs = jobId ? [readJob(jobId)] : listJobs();
        const statuses = jobs.map(getJobStatus).slice(-20);
        if (statuses.length === 0) {
          ctx.ui.notify("No HF backup jobs found", "info");
          return;
        }
        ctx.ui.setWidget(
          "hf-backup-status",
          statuses.map((s) => `${s.state.padEnd(8)} ${s.jobId} files=${s.bucket?.total_files ?? "?"} size=${s.bucket?.size ?? "?"}`),
        );
        ctx.ui.notify(`Showing ${statuses.length} HF backup job(s)`, "info");
      } catch (error: any) {
        ctx.ui.notify(error?.message || String(error), "error");
      }
    },
  });

  pi.registerCommand("hf-quarantine", {
    description: "Quarantine a completed verified HF backup source: /hf-quarantine <jobId>",
    handler: async (args, ctx) => {
      try {
        const jobId = args.trim();
        if (!jobId) {
          ctx.ui.notify("Usage: /hf-quarantine <jobId>", "error");
          return;
        }
        const result = quarantineJob(jobId);
        ctx.ui.notify(`Quarantined: ${"quarantinePath" in result ? result.quarantinePath : "already missing"}`, "info");
      } catch (error: any) {
        ctx.ui.notify(error?.message || String(error), "error");
      }
    },
  });
}
