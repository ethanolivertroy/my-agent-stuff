---
name: mischief-managed
description: Use when finishing a Pi, Codex, or other coding-agent session and wanting to save a lean Markdown session note into an Obsidian vault with decisions, code changes, validation, caveats, and follow-ups.
---

# Mischief Managed - Session Summary to Obsidian

Write a compact session note into an Obsidian vault so the work is searchable and resumable later. This is a summary, not a full transcript. For transcript-style capture in Pi, use the built-in `/export` command or `pi --export`.

## Obsidian Vault Location

Use this priority order:

1. If the user gives a vault path or note path, use it.
2. If `OBSIDIAN_VAULT_PATH` is set, write to `$OBSIDIAN_VAULT_PATH/Agent-Sessions/`.
3. If `~/Obsidian` exists, write to `~/Obsidian/Agent-Sessions/`.
4. Otherwise ask once for the Obsidian vault path before writing.

Do not silently write outside an Obsidian vault unless the user explicitly asks.

Filename:

```text
{YYYY-MM-DD-HHMM}-{slug}.md
```

Use a 2-4 word kebab-case slug based on the completed work.

## Metadata

Run one shell command to collect context:

```bash
git rev-parse --abbrev-ref HEAD 2>/dev/null || echo ""; basename "$(git rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null || echo ""; date +%Y-%m-%d-%H%M; date +"%b %d, %Y"; pwd; git remote get-url origin 2>/dev/null || echo ""
```

Map output to:

- `BRANCH`
- `REPO`
- `DATETIME`
- `PRETTY_DATE`
- `DIR`
- `REPO_URL`

If the git values are blank, omit them from frontmatter.

## Note Shape

```markdown
---
date: {DATETIME}
branch: {BRANCH}
repo: {REPO}
directory: {DIR}
tags: [agent-session, codex-session, {tag1}, {tag2}]
---

# Session: {SLUG} - {PRETTY_DATE}

## Summary
2-3 sentences describing what changed and why.

## What Was Discussed
- Short bullets with useful context.

## Key Decisions
- decision - rationale

## Code Changes
- `path` - what changed and why

## Tests & Validation
- `command` - result

## Risks / Caveats
- Anything unresolved, unverified, or worth revisiting.

## Questions & Follow-ups
- [ ] Concrete next action
```

Required sections: `Summary`, `What Was Discussed`, `Key Decisions`, and `Questions & Follow-ups`.

Include `Code Changes`, `Tests & Validation`, and `Risks / Caveats` only when meaningful.

## Content Rules

- Keep it lean. Capture durable facts, not every exchange.
- Preserve exact commands, filenames, issue IDs, URLs, and error messages when they matter.
- Prefer Obsidian-friendly Markdown: wikilinks are fine when the target note is obvious, but do not invent a vault taxonomy.
- Do not include secrets, tokens, cookies, API keys, or private credential material. Redact as `{REDACTED}` if needed.
- Do not post to external trackers or services unless the user explicitly asks in the current session.

## Confirmation

After writing, respond with:

- absolute note path
- one-line summary of what was captured
