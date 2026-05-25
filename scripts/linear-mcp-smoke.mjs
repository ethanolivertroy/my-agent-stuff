#!/usr/bin/env node
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const execFileAsync = promisify(execFile);
const DEFAULT_ENDPOINT = "https://mcp.linear.app/mcp";

function env(name) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function normalizeSecretOutput(output, source) {
  const token = output.trim();
  if (!token) throw new Error(`${source} produced an empty token.`);
  const nonEmptyLines = token.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (nonEmptyLines.length > 1) {
    throw new Error(`${source} produced multiple lines. Point the secret reference at a single token field.`);
  }
  return token;
}

async function execSecret(command, args, label, includeStderr = true) {
  try {
    const { stdout } = await execFileAsync(command, args, {
      timeout: 30_000,
      maxBuffer: 1024 * 1024,
      encoding: "utf8",
    });
    return normalizeSecretOutput(stdout, label);
  } catch (error) {
    const stderr = typeof error.stderr === "string" ? error.stderr.trim() : "";
    const detail = includeStderr && stderr ? stderr : error.message;
    throw new Error(`${label} failed: ${detail}`);
  }
}

async function resolveToken() {
  const protonPassCli = env("LINEAR_MCP_PROTON_PASS_CLI") || env("LINEAR_MCP_PROTONPASS_CLI") || "pass-cli";
  const protonPassRef = env("LINEAR_MCP_PROTON_PASS_REF") || env("LINEAR_MCP_PROTONPASS_REF");
  if (protonPassRef) return execSecret(protonPassCli, ["item", "view", protonPassRef], "Proton Pass CLI");

  const vault = env("LINEAR_MCP_PROTON_PASS_VAULT") || env("LINEAR_MCP_PROTONPASS_VAULT");
  const item = env("LINEAR_MCP_PROTON_PASS_ITEM") || env("LINEAR_MCP_PROTONPASS_ITEM");
  const field = env("LINEAR_MCP_PROTON_PASS_FIELD") || env("LINEAR_MCP_PROTONPASS_FIELD") || "password";
  if (vault || item) {
    if (!vault || !item) {
      throw new Error("Set both LINEAR_MCP_PROTON_PASS_VAULT and LINEAR_MCP_PROTON_PASS_ITEM, or use LINEAR_MCP_PROTON_PASS_REF.");
    }
    return execSecret(protonPassCli, ["item", "view", "--vault-name", vault, "--item-title", item, "--field", field], "Proton Pass CLI");
  }

  const onePasswordRef = env("LINEAR_MCP_1PASSWORD_REF");
  if (onePasswordRef) return execSecret(env("LINEAR_MCP_1PASSWORD_CLI") || "op", ["read", onePasswordRef], "1Password CLI");

  const staticToken = env("LINEAR_MCP_TOKEN") || env("LINEAR_ACCESS_TOKEN") || env("LINEAR_API_KEY");
  if (staticToken) return staticToken;

  const tokenCommand = env("LINEAR_MCP_TOKEN_COMMAND");
  if (tokenCommand) return execSecret("/bin/sh", ["-lc", tokenCommand], "LINEAR_MCP_TOKEN_COMMAND", false);

  throw new Error("No Linear auth configured. Set a Proton Pass ref/vault+item, 1Password ref, LINEAR_API_KEY, LINEAR_ACCESS_TOKEN, or LINEAR_MCP_TOKEN.");
}

async function main() {
  const endpoint = env("LINEAR_MCP_ENDPOINT") || DEFAULT_ENDPOINT;
  const token = await resolveToken();
  const client = new Client({ name: "my-agent-stuff-linear-smoke", version: "0.1.0" });
  const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "my-agent-stuff-linear-smoke/0.1.0",
      },
    },
  });

  try {
    await client.connect(transport, { timeout: 30_000 });
    const tools = [];
    let cursor;
    do {
      const page = await client.listTools(cursor ? { cursor } : undefined, { timeout: 30_000 });
      tools.push(...page.tools);
      cursor = page.nextCursor;
    } while (cursor);

    console.log(`Linear MCP smoke OK: ${tools.length} tools from ${endpoint}`);
    const readOnly = tools.filter((tool) => tool.annotations?.readOnlyHint).map((tool) => tool.name).slice(0, 12);
    if (readOnly.length > 0) console.log(`Read-only tools sample: ${readOnly.join(", ")}`);
  } finally {
    await client.close().catch(() => undefined);
  }
}

main().catch((error) => {
  console.error(`Linear MCP smoke failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
