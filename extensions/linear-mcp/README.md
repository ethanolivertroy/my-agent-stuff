# Linear MCP Pi Extension

Dynamic Pi extension that mirrors Linear's official hosted MCP server into Pi tools.

## Why this design

Linear does not publish a stable public catalog of every MCP tool schema. The live MCP server is the source of truth, so this extension connects to Linear MCP, calls `tools/list`, and registers each upstream tool dynamically with Pi.

Default endpoint:

```text
https://mcp.linear.app/mcp
```

## Setup

Create a Linear API key or OAuth access token, store it in a password manager, then point the extension at the secret reference.

Recommended: put only a password-manager reference in `.env.local`:

```bash
LINEAR_MCP_SECRET_REF='pass://ExampleVault/pi-linear/API Key'
# or
LINEAR_MCP_SECRET_REF='op://ExampleVault/pi-linear/API Key'
```

`.env.local` is auto-loaded for safe reference metadata only; raw token variables are intentionally not loaded from files.

Proton Pass CLI also supports split vault/item fields:

```bash
export LINEAR_MCP_PROTON_PASS_VAULT='ExampleVault'
export LINEAR_MCP_PROTON_PASS_ITEM='pi-linear'
export LINEAR_MCP_PROTON_PASS_FIELD='API Key'
```

Manager-specific refs still work:

```bash
export LINEAR_MCP_PROTON_PASS_REF='pass://ExampleVault/pi-linear/API Key'
export LINEAR_MCP_1PASSWORD_REF='op://ExampleVault/pi-linear/API Key'
```

Plain env tokens still work for CI/dev if exported by the shell:

```bash
export LINEAR_API_KEY="lin_api_..."
# or LINEAR_ACCESS_TOKEN / LINEAR_MCP_TOKEN
```

Load locally:

```bash
pi -e ./extensions/linear-mcp
```

Or install this repository/package as a Pi package once `package.json` includes the extension manifest.

## Smoke test

Once auth is configured, verify direct MCP connectivity without starting Pi:

```bash
npm run linear:smoke
```

## Commands

- `/linear-status` — show endpoint, auth status, connection status, and mirrored tool count.
- `/linear-status verbose` — also list Pi tool names and upstream MCP tool names.
- `/linear-refresh-tools` — reconnect to Linear MCP, fetch `tools/list`, and register/update mirrored tools.

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `LINEAR_MCP_SECRET_REF` | unset | Preferred generic secret ref. Supports `pass://...` and `op://...`. Safe to place in `.env.local`. |
| `LINEAR_MCP_TOKEN_REF` | unset | Alias generic token ref. Supports `pass://...` and `op://...`. Safe to place in `.env.local`. |
| `LINEAR_MCP_PROTON_PASS_REF` | unset | Proton Pass URI reference accepted by `pass-cli item view`, e.g. `pass://ExampleVault/pi-linear/API Key`. |
| `LINEAR_MCP_PROTON_PASS_VAULT` | unset | Proton Pass vault name for human-readable lookup. Use with `LINEAR_MCP_PROTON_PASS_ITEM`. |
| `LINEAR_MCP_PROTON_PASS_ITEM` | unset | Proton Pass item title for human-readable lookup. Use with `LINEAR_MCP_PROTON_PASS_VAULT`. |
| `LINEAR_MCP_PROTON_PASS_FIELD` | `password` | Proton Pass field to read in vault/item mode. |
| `LINEAR_MCP_PROTON_PASS_CLI` | `pass-cli` | Proton Pass CLI binary path/name. Alias `LINEAR_MCP_PROTONPASS_*` also works. |
| `LINEAR_MCP_1PASSWORD_REF` | unset | 1Password secret reference, e.g. `op://ExampleVault/Linear API Key/token`. |
| `LINEAR_MCP_1PASSWORD_CLI` | `op` | 1Password CLI binary path/name. |
| `LINEAR_API_KEY` | unset | Linear personal API key used as Bearer token. |
| `LINEAR_ACCESS_TOKEN` | unset | Linear OAuth access token used as Bearer token. |
| `LINEAR_MCP_TOKEN` | unset | Explicit token override. |
| `LINEAR_MCP_TOKEN_COMMAND` | unset | Last-resort shell command that prints a token to stdout. Prefer manager-specific refs above. |
| `LINEAR_MCP_ENDPOINT` | `https://mcp.linear.app/mcp` | Alternate MCP endpoint for testing. |
| `LINEAR_MCP_TIMEOUT_MS` | `120000` | Per-tool call timeout. |
| `LINEAR_MCP_TOOL_PREFIX` | empty | Optional prefix for Pi tool names, e.g. `linear_`. Exact MCP names are used by default for parity. |
| `LINEAR_MCP_CONFIRM_MUTATIONS` | unset | Set `1`/`true` to ask before mutating tools. |
| `LINEAR_MCP_WRITE_SNAPSHOT` | enabled | Set `0` to disable writing `~/.pi/agent/linear-mcp/tools.latest.json`. |

## Notes

- Exact tool names are used by default because the goal is feature parity with Linear MCP.
- If Linear removes an upstream tool, use `/reload` after refresh to fully clear stale Pi registrations.
- Tool snapshots are written without secrets to `~/.pi/agent/linear-mcp/tools.latest.json` for debugging and parity checks.
- Proton Pass CLI support runs `pass-cli item view ...` without a shell.
- 1Password CLI support runs `op read "$LINEAR_MCP_1PASSWORD_REF"` without a shell.
- Password-manager refs are tried before plain environment tokens.
- Secret resolution is shared through `src/secret-resolver.ts` so other extensions can use the same pattern.
- `.env.local`/`.env` auto-loading only imports reference/config metadata such as `*_REF`, `*_VAULT`, `*_ITEM`, `*_FIELD`, and `*_CLI`; it skips raw `*_TOKEN`, `*_API_KEY`, `*_PASSWORD`, and `*_SECRET` values.
- Secret command output must be a single non-empty line; multiline output is rejected so item dumps are not accidentally sent as bearer tokens.
- `LINEAR_MCP_TOKEN_COMMAND` uses `/bin/sh -lc` and is less safe; prefer Proton Pass or 1Password refs.
- OAuth browser setup is not implemented yet; token-based auth is the MVP path.
