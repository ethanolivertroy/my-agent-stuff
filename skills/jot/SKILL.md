---
name: jot
description: >-
  This skill should be used when the user asks to "jot this down",
  "add this to my daily note", "save this to today's note",
  "log this to obsidian", "note this down", "put this in my daily",
  or invokes /jot. Quickly appends any content - insights, thoughts,
  todos, links, ideas - to today's daily note in the configured
  Obsidian vault.
---

# Jot - Quick Append to Daily Note

Append any content to today's daily note in the user's configured Obsidian vault. Designed for speed: capture the thing and confirm, nothing more.

## Configuration

- **Vault:** use `OBSIDIAN_VAULT_NAME` when set; otherwise ask once or use a clearly established vault from context.
- **Daily note path:** `Periodic Notes/Daily Notes/YYYY-MM-DD.md`
- **Heading level:** `##` (matches existing daily note entries)

## Workflow

1. Determine today's date in `YYYY-MM-DD` format.
2. If the user passed text with `/jot <text>`, use that as the content. Otherwise, use the content from the conversation context that the user wants saved.
3. Derive a short, descriptive `##` heading from the content (2-5 words).
4. Run the append command:

```bash
obsidian vault="$OBSIDIAN_VAULT_NAME" append path="Periodic Notes/Daily Notes/YYYY-MM-DD.md" content="\n## Heading Here\n\nContent here" silent
```

5. Confirm the append succeeded. If the command produces no output, it succeeded.

## Formatting Rules

- Start content with `\n` so there is a blank line before the new heading.
- Use `\n` for line breaks within content.
- Keep the `##` heading concise so it scans well alongside nearby daily-note entries.
- Preserve the user's original wording. Do not rewrite or summarize unless asked.
- For multi-paragraph content, separate paragraphs with `\n\n`.

## Error Handling

- If `obsidian` CLI returns "Vault not found", the vault name may have changed. Check available vaults with `obsidian vaults`.
- If the daily note does not exist yet, `append` will fail. Create it first with `obsidian vault="$OBSIDIAN_VAULT_NAME" create path="Periodic Notes/Daily Notes/YYYY-MM-DD.md" content="# Log" silent`.
