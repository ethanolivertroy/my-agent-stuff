# Linear MCP Pi Extension

Dynamic Pi extension that mirrors Linear's official hosted MCP server into Pi tools.

## Why this design

Linear does not publish a stable public catalog of every MCP tool schema. The live MCP server is the source of truth, so this extension connects to Linear MCP, calls `tools/list`, and registers each upstream tool dynamically with Pi.

Default endpoint:

```text
https://mcp.linear.app/mcp
```

## Setup

Create a Linear API key or OAuth access token, then start Pi with one of:

```bash
export LINEAR_API_KEY="lin_api_..."
# or
export LINEAR_ACCESS_TOKEN="..."
# or
export LINEAR_MCP_TOKEN="..."
```

Load locally:

```bash
pi -e ./extensions/linear-mcp
```

Or install this repository/package as a Pi package once `package.json` includes the extension manifest.

## Commands

- `/linear-status` — show endpoint, auth status, connection status, and mirrored tool count.
- `/linear-status verbose` — also list Pi tool names and upstream MCP tool names.
- `/linear-refresh-tools` — reconnect to Linear MCP, fetch `tools/list`, and register/update mirrored tools.

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `LINEAR_API_KEY` | unset | Linear personal API key used as Bearer token. |
| `LINEAR_ACCESS_TOKEN` | unset | Linear OAuth access token used as Bearer token. |
| `LINEAR_MCP_TOKEN` | unset | Explicit token override. |
| `LINEAR_MCP_ENDPOINT` | `https://mcp.linear.app/mcp` | Alternate MCP endpoint for testing. |
| `LINEAR_MCP_TIMEOUT_MS` | `120000` | Per-tool call timeout. |
| `LINEAR_MCP_TOOL_PREFIX` | empty | Optional prefix for Pi tool names, e.g. `linear_`. Exact MCP names are used by default for parity. |
| `LINEAR_MCP_CONFIRM_MUTATIONS` | unset | Set `1`/`true` to ask before mutating tools. |
| `LINEAR_MCP_WRITE_SNAPSHOT` | enabled | Set `0` to disable writing `~/.pi/agent/linear-mcp/tools.latest.json`. |

## Notes

- Exact tool names are used by default because the goal is feature parity with Linear MCP.
- If Linear removes an upstream tool, use `/reload` after refresh to fully clear stale Pi registrations.
- Tool snapshots are written without secrets to `~/.pi/agent/linear-mcp/tools.latest.json` for debugging and parity checks.
- OAuth browser setup is not implemented yet; token-based auth is the MVP path.
