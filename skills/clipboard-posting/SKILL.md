---
name: clipboard-posting
description: Use when the user asks to copy drafted content to the clipboard, copy it again, prepare something for LinkedIn, paste rich text into a social composer, or stage plain text for X. This skill tells Pi when to use the rich clipboard extension and which format/target to choose.
---

# Clipboard Posting

Use the `copy_rich_clipboard` tool for clipboard requests instead of explaining the workflow manually.

## When to use

Trigger this skill when the user says things like:

- "copy this to my clipboard"
- "put this on my clipboard"
- "copy it again"
- "make this paste nicely into LinkedIn"
- "prep this for X"
- "open LinkedIn and stage the formatted version"

## Workflow

1. Identify the content to copy.
   - If the user already approved a draft in the conversation, use that exact draft.
   - If the user says "copy it again", reuse the most recent approved version.
   - Do not silently rewrite the content unless the user asks for edits.

2. Choose the correct format.
   - `markdown` - default for rich-text paste targets like LinkedIn or other editors that preserve formatting.
   - `html` - use when the user already supplied HTML and wants that copied as-is.
   - `text` - use for plain-text destinations like X, terminals, or anywhere formatting should be stripped.

3. Choose the destination behavior.
   - `target: linkedin-article` for the LinkedIn article composer.
   - `target: linkedin-post` for a normal LinkedIn post flow.
   - `target: x` for X compose.
   - `target: none` when the user only wants the clipboard updated.
   - If the user gives a specific URL to open, pass it via `openUrl`.

4. Call the tool directly.

### Tool examples

```json
{
  "content": "# Draft post\n\nThis is ready to publish.",
  "format": "markdown",
  "target": "linkedin-article"
}
```

```json
{
  "content": "Short plain-text post for X",
  "format": "text",
  "target": "x"
}
```

## Notes

- Prefer the tool over narrating manual clipboard steps.
- Preserve links, bullets, and paragraph breaks for LinkedIn-style content.
- Keep hashtags and URLs exactly as approved unless the user asks for changes.
- If the user wants to do it manually inside Pi, mention the commands `/copy-rich`, `/copy-linkedin`, and `/copy-x`.
