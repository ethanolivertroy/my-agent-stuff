---
name: huggingface-backup
description: Safely back up local folders to private Hugging Face Buckets using the installed hf CLI and the hf-buckets Pi extension. Use when the user asks to upload/archive/back up local data, training data, agent traces, model artifacts, checkpoints, corpora, or folders to Hugging Face storage, especially when privacy, buckets, quarantine, resume, monitoring, or deleting local copies is involved.
---

# Hugging Face Backup

Use this skill for safe Hugging Face bucket backups.

First load/use the official `hf-cli` skill when you need current command details. It is installed at:

`~/.agents/skills/hf-cli/SKILL.md`

## Golden Rules

- Prefer **Hugging Face Buckets** for raw folder backups unless the user explicitly asks for a model/dataset/space repo.
- Create buckets as **private by default**.
- Never upload obvious secrets if avoidable.
- Never permanently delete local data after upload. Move verified uploads to quarantine instead.
- Verify remote bucket metadata and nonzero file count before quarantine.
- Use conservative concurrency. HF/Xet can rate-limit hard; prefer one or two active syncs for multi-GB folders.
- If an upload appears stuck with zero CPU, old logs, `429 Too Many Requests`, or `CLOSE_WAIT`, stop/restart with lower concurrency or serial sync.

## Safe Excludes

Always include these excludes for bucket syncs unless the user explicitly overrides:

```bash
--exclude '**/.git/**'
--exclude '**/.DS_Store'
--exclude '**/__pycache__/**'
--exclude '**/.pytest_cache/**'
--exclude '**/.venv/**'
--exclude '**/venv/**'
--exclude '**/.env'
--exclude '**/.env.*'
--exclude '**/*cookie*'
--exclude '**/*Cookie*'
--exclude '**/*token*'
--exclude '**/*Token*'
--exclude '**/*secret*'
--exclude '**/*Secret*'
--exclude '**/*.ovpn'
--exclude '**/auth_session.json'
```

## Pi Extension

The global Pi extension is installed at:

`~/.pi/agent/extensions/hf-buckets/index.ts`

After `/reload` or a new Pi session, it provides:

### Slash commands

```bash
/hf-backup <path> --bucket <bucket-name> [--namespace <user-or-org>] [--dry-run]
/hf-status [job-id]
/hf-quarantine <job-id>
```

### Tools available to the model

- `hf_safe_bucket_backup` — start a detached private bucket sync with secret-safe excludes.
- `hf_backup_status` — inspect one or all backup jobs.
- `hf_quarantine_uploaded` — move a completed verified source folder to quarantine.

Job state lives under:

`~/.pi/hf-backups/jobs/`

Default quarantine root:

`~/.trash/hf-uploaded-training-folders/`

## Manual Fallback Workflow

If the extension is not loaded, use the official `hf` CLI directly:

```bash
hf buckets create <namespace>/<bucket> --private --exist-ok
hf buckets sync <local-path> hf://buckets/<namespace>/<bucket> \
  --exclude '**/.git/**' \
  --exclude '**/.DS_Store' \
  --exclude '**/__pycache__/**' \
  --exclude '**/.pytest_cache/**' \
  --exclude '**/.venv/**' \
  --exclude '**/venv/**' \
  --exclude '**/.env' \
  --exclude '**/.env.*' \
  --exclude '**/*cookie*' \
  --exclude '**/*Cookie*' \
  --exclude '**/*token*' \
  --exclude '**/*Token*' \
  --exclude '**/*secret*' \
  --exclude '**/*Secret*' \
  --exclude '**/*.ovpn' \
  --exclude '**/auth_session.json'

hf buckets info <namespace>/<bucket> --format json
hf buckets list <namespace>/<bucket> -R --quiet | wc -l
```

Only after the bucket is private and has nonzero files should local data be moved to quarantine:

```bash
mkdir -p ~/.trash/hf-uploaded-training-folders/YYYY-MM-DD
mv <local-path> ~/.trash/hf-uploaded-training-folders/YYYY-MM-DD/<bucket-name>
```

## Monitoring Guidance

For long-running uploads:

- Start detached jobs or use the extension.
- Monitor process status and per-job logs.
- Use a subagent monitor for multi-bucket or multi-hour upload sessions.
- Mark as stalled if log mtime is older than ten minutes and the process has zero CPU, especially if Xet logs show `429 Too Many Requests`.
- Resume safely: `hf buckets sync` is resumable/deduplicating enough for retry-style workflows.

## Common Bucket Naming

Use lowercase, hyphenated bucket names:

- `project-backup`
- `training-data-archive`
- `research-corpus-YYYY-MM-DD`
- `model-artifacts-YYYY-MM-DD`
- `agent-traces-YYYY-MM-DD`

If the user says “repo” but also says “bucket”, prefer bucket. Ask only if ambiguous and destructive or public/private semantics matter.
