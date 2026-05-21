# Linear Pi Extension Plan

## Goal

Build a Pi package extension that gives Pi full feature parity with Linear's official hosted MCP server.

## Research snapshot

Authoritative sources:

- Linear MCP docs: https://linear.app/docs/mcp
- Linear Developer docs: https://linear.app/developers
- Linear GraphQL API: https://linear.app/developers/graphql
- Linear TypeScript SDK: https://linear.app/developers/sdk
- Linear OAuth docs: https://linear.app/developers/oauth-2-0-authentication
- MCP TypeScript SDK: https://ts.sdk.modelcontextprotocol.io/

Known Linear MCP facts:

- Hosted endpoint: `https://mcp.linear.app/mcp`
- Transport: remote MCP Streamable HTTP; legacy `/sse` is being deprecated/removed.
- Auth: OAuth 2.1 with dynamic client registration. Linear also documents direct `Authorization: Bearer <token>` support for OAuth access tokens or API keys.
- Public docs describe capabilities, but do **not** publish a complete authoritative `tools/list` schema. Exact parity requires capturing authenticated `tools/list` from the live server.

Likely modern tool surface from existing Linear MCP skill/docs/changelog:

- Issues: `list_issues`, `get_issue`, `save_issue`
- Comments: `list_comments`, `save_comment`
- Teams/users: `list_teams`, `list_users`, `get_user`
- Metadata: `list_issue_statuses`, `list_issue_labels`, `create_issue_label`
- Cycles: `list_cycles`
- Projects: `list_projects`, `get_project`, `save_project`
- Initiatives: `list_initiatives`, `get_initiative`, `save_initiative`
- Milestones: `list_milestones`, `save_milestone`
- Updates: `get_status_updates`, `save_status_update`
- Documents: `list_documents`, `get_document`, `search_documentation`, `create_document`, `update_document`
- Attachments: `create_attachment` and possibly upload-prep/linking tools depending on the current live schema

## Recommended architecture

### Phase 1: MCP pass-through mirror (parity-first)

Implement the Pi extension as a dynamic MCP-to-Pi adapter:

1. Connect to `https://mcp.linear.app/mcp` with the MCP TypeScript client SDK.
2. Authenticate using `LINEAR_API_KEY`/`LINEAR_ACCESS_TOKEN` first; add OAuth setup after MVP.
3. Call authenticated `tools/list` at extension startup.
4. Register each Linear MCP tool dynamically with `pi.registerTool()` using the MCP tool name, description, and JSON schema.
5. On Pi tool execution, call upstream MCP `callTool({ name, arguments })` and return MCP content/details to Pi.
6. Cache/snapshot the live tool catalog for debugging and parity tests.

Why this first:

- Exact feature parity follows Linear's live MCP surface automatically.
- Avoids reimplementing Linear's GraphQL semantics and keeping up with renamed tools like `save_issue`.
- Any new official Linear MCP tool becomes available after reload without code changes.

### Phase 2: Pi-native UX layer

Add convenience around the mirrored tools without compromising parity:

- `/linear-auth` command for token/OAuth setup and diagnostics.
- `/linear-refresh-tools` command to reconnect and refresh tool catalog.
- Status/footer widget showing Linear auth/connection state.
- Autocomplete for issue identifiers like `ABC-123`, teams, projects, and users.
- Compact custom renderers for issue/project/comment results.
- Optional safety confirmations for mutating tools (`save_*`, `create_*`, `update_*`).

### Phase 3: Native fallback implementation

Only if MCP pass-through is insufficient, add `@linear/sdk` direct implementations for a small subset or offline fallback:

- `@linear/sdk` package for GraphQL API access.
- Use API key/OAuth token auth.
- Implement tool-compatible wrappers for common tools.
- Keep wrappers aligned with the captured MCP schema.

## Package structure

```text
my-agent-stuff/
  package.json
  extensions/
    linear-mcp/
      package.json
      index.ts
      src/
        auth.ts
        client.ts
        schemas.ts
        tools.ts
        renderers.ts
        commands.ts
      snapshots/
        linear-tools.example.json
      README.md
  skills/
    linear-pi-extension/
      SKILL.md
  docs/
    linear-pi-extension-plan.md
```

`package.json` should add:

```json
{
  "pi": {
    "skills": ["./skills"],
    "extensions": ["./extensions/linear-mcp/index.ts"]
  }
}
```

Extension dependencies:

- `@modelcontextprotocol/sdk` or current MCP client package
- `typebox` for Pi tool schemas / unsafe schema wrapping
- optionally `@linear/sdk` for fallback/dev utilities

Core Pi APIs:

- `pi.registerTool()` for dynamic tool registration.
- `pi.registerCommand()` for auth and refresh commands.
- `ctx.ui.notify()`, `ctx.ui.setStatus()`, `ctx.ui.addAutocompleteProvider()` for UX.
- `pi.appendEntry()` if we persist non-secret catalog metadata in sessions.

## Auth plan

MVP:

- Read token from env: `LINEAR_API_KEY` or `LINEAR_ACCESS_TOKEN`.
- Pass as `Authorization: Bearer <token>` to MCP transport.
- Provide a `/linear-status` command that verifies `tools/list` works.

Post-MVP:

- OAuth 2.1 flow using MCP SDK OAuth provider.
- Store credentials in Pi auth storage if the extension API exposes an appropriate mechanism; otherwise store under `~/.pi/agent/linear-mcp/credentials.json` with `0600` permissions.
- Never persist tokens to session entries or tool details.

## Testing strategy

1. Unit-test JSON schema conversion from MCP tool input schemas to Pi tool parameter schemas.
2. Mock MCP server tests for:
   - `tools/list` dynamic registration
   - `callTool` success/error forwarding
   - auth failure reporting
   - refresh/reload behavior
3. Live opt-in tests gated by `LINEAR_API_KEY`:
   - capture `tools/list` snapshot
   - call read-only tools (`list_teams`, `list_issues limit=1`)
4. Manual Pi smoke tests:
   - load extension with `pi -e ./extensions/linear-mcp`
   - ask Pi to list teams, get an issue, create/update a test issue
   - verify TUI rendering and error behavior

## Open questions

- Which MCP SDK package/version should we target: stable `@modelcontextprotocol/sdk` v1.x vs client v2 alpha?
- Does Pi's `Type.Unsafe()`/raw JSON schema path accept the MCP input schemas as-is, or do we need a converter?
- Do we want the mirrored tool names to be exact (`list_issues`) or prefixed (`linear_list_issues`) to avoid collisions?
- Should mutating tools require confirmation by default?
- Where should OAuth credentials live for Pi extensions?

## Proposed next implementation slice

Build a minimal dynamic mirror:

1. Add `extensions/linear-mcp/package.json` and `index.ts`.
2. Connect to Linear MCP with bearer auth from env.
3. Fetch `tools/list` and register every tool.
4. Forward `execute()` calls to MCP `callTool`.
5. Add `/linear-status` and `/linear-refresh-tools`.
6. Add README setup instructions.
7. Run a live read-only smoke test once a token is available.
