---
name: conversation-dump
description: This skill should be used when the user asks to "dump this conversation", "save this conversation to markdown", "output this conversation to a markdown file", "export this chat", "log this session to a file", "save this chat log", or similar. Produces a structured, readable capture of the current Pi conversation - user requests verbatim, assistant responses in full, commands plus key output inline, decisions preserved - not a brief summary. Distinct from mischief-managed, which writes a compact Obsidian session note.
metadata:
  short-description: Export the full conversation as Markdown
---

# Conversation Dump - Full Markdown Transcript

Create a faithful Markdown record of the current Pi conversation. This is for full-fidelity capture, not an end-of-session summary.

## Use When

Use this skill when the user asks to:

- dump this conversation
- save this conversation to Markdown
- export this chat
- log this session to a file
- save the chat log
- output the full transcript

Do **not** trigger on Mischief Managed territory, such as "wrap up this session," "save a session summary," or "write this to Pi-Sessions." Mischief Managed writes a compact summary. Conversation Dump writes the full readable transcript.

## Output Goal

The Markdown file should preserve:

- user requests as close to verbatim as possible
- assistant responses in full when available in context
- tool calls and commands that materially changed state
- key command output, summarized only when output is huge
- file paths touched
- decisions made
- follow-up items

Do not reduce the session to a short summary. Prefer a structured transcript with enough context that future-you can reconstruct what happened.

## Destination

Use this priority order:

1. explicit path or folder requested by the user
2. current working directory if the user says "here" or implies the repo/project
3. ask one clarifying question if destination is unclear

Good default filename:

```text
conversation-dump-{YYYY-MM-DD-HHMM}-{short-slug}.md
```

If the user wants it in Obsidian, use the user-provided vault path. Do not assume the Pi session summary folder unless they explicitly ask for it.

## Workflow

### 1. Gather metadata

Run one shell command:

```bash
date +%Y-%m-%d-%H%M; date +"%b %d, %Y"; pwd; git rev-parse --abbrev-ref HEAD 2>/dev/null || echo ""; basename "$(git rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null || echo ""; git remote get-url origin 2>/dev/null || echo ""
```

Map to:

- `DATETIME`
- `PRETTY_DATE`
- `DIR`
- `BRANCH`
- `REPO`
- `REPO_URL`

### 2. Build the dump

Use this structure:

```markdown
---
date: {DATETIME}
type: conversation-dump
directory: {DIR}
branch: {BRANCH}      # omit if empty
repo: {REPO}          # omit if empty
repo_url: {REPO_URL}  # omit if empty
---

# Conversation Dump: {SHORT TITLE} - {PRETTY_DATE}

## Context
- Working directory: `{DIR}`
- Goal: ...

## Timeline

### 1. User
> Verbatim user request.

### 2. Assistant
Assistant response in full, or a faithful reconstruction if exact text is not available.

### 3. Tool / Command
```bash
command here
```

Key output:
```text
important output here
```

## Files Changed
- `path` - what changed

## Decisions Preserved
- decision - rationale

## Follow-ups
- [ ] item
```

Number turns sequentially. Keep command output readable: include exact short output; for huge output, include the relevant excerpt and note that output was truncated.

### 3. Write the file

Use one write operation when possible. Let the write tool create missing parent directories.

### 4. Confirm

Return:

- full path written
- one sentence describing what was captured
- any caveat about omitted or truncated output
