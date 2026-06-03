#!/usr/bin/env node
import { createJiti } from "jiti";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const jiti = createJiti(import.meta.url);
const { createSecretResolver } = await jiti.import("../src/secret-resolver.ts");
const DEFAULT_ENDPOINT = "https://mcp.linear.app/mcp";

function env(name) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

const tokenResolver = createSecretResolver({
  serviceName: "Linear MCP smoke test",
  envPrefix: "LINEAR_MCP",
  secretName: "Linear API token",
  staticEnvNames: ["LINEAR_MCP_TOKEN", "LINEAR_ACCESS_TOKEN", "LINEAR_API_KEY"],
  commandEnvNames: ["LINEAR_MCP_TOKEN_COMMAND"],
  notConfiguredMessage:
    "No Linear auth configured. Set LINEAR_MCP_SECRET_REF, a Proton Pass ref/vault+item, 1Password ref, LINEAR_API_KEY, LINEAR_ACCESS_TOKEN, or LINEAR_MCP_TOKEN.",
});

async function main() {
  const endpoint = env("LINEAR_MCP_ENDPOINT") || DEFAULT_ENDPOINT;
  const token = await tokenResolver.resolve();
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
