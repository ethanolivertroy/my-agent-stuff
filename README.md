# My Agent Stuff

- Inspired by https://github.com/mitsuhiko/agent-stuff
- This is "my" agent-stuff
- Although I would never marry any solution, pi.dev is mostly my daily driver now

## Layout

This follows the same broad shape as Armin's `agent-stuff` repo: first-class `extensions/`, `skills/`, and `commands/` directories loaded by the `pi` manifest. Former third-party Pi packages now live directly in those directories rather than in a vendor package folder.

See [upstream package sources](./docs/upstream-pi-packages.md) for provenance and license notes.

## Secret scanning

This public repo uses Gitleaks via repo-managed Git hooks:

```bash
brew install gitleaks
npm run secrets:install-hooks
npm run secrets:scan
```

Installed hooks run a staged scan before commits and an outgoing-commit scan before pushes. Use `SKIP_SECRET_SCAN=1` only for emergency bypasses.

Extensions that need API tokens should use the shared local resolver in [`src/secret-resolver.ts`](./src/secret-resolver.ts); see [`docs/extension-secret-management.md`](./docs/extension-secret-management.md). Store password-manager refs in `.env.local`, not raw tokens.

## Pi Extensions

| Extension | Description |
| --- | --- |
| [exa-search](./extensions/exa-search) | Advanced Exa web search with categories, filters, and optional result contents. |
| [linear-mcp](./extensions/linear-mcp) | Mirror Linear's official hosted MCP server into Pi tools with dynamic `tools/list` registration. |
| [ollama-web-search](./extensions/ollama-web-search.ts) | Local Ollama-backed `web_search` and `web_fetch` tools. |
| [grok-cli](./extensions/grok-cli) | Use Grok Build/Composer in Pi through the existing Grok CLI login session. |
| [hf-buckets](./extensions/hf-buckets) | Safe private Hugging Face Bucket backups with detached jobs, verification, and quarantine. |
| [mm-command](./extensions/mm-command.ts) | Shortcut command for invoking the `mischief-managed` session-note skill. |
| [nanobanana](./extensions/nanobanana) | Generate or edit images with Google Gemini image models. |
| [rich-clipboard](./extensions/rich-clipboard) | Copy Markdown, HTML, or plain text to the system clipboard for rich paste targets. |
| [termdraw](./extensions/termdraw) | Open termDRAW inside a Pi overlay with `/termdraw`. |
| [voipi](./extensions/voipi) | Text-to-speech tools and `/tts` commands. |
| [subagents](./extensions/subagents) | Subagent orchestration tool, built-in agents, and related commands. |
| [autoresearch](./extensions/autoresearch) | Experiment loop tools, dashboard, hooks, and autoresearch command. |

## Pi Skills

| Skill | Description |
| --- | --- |
| [clipboard-posting](./skills/clipboard-posting) | Use the rich clipboard extension for approved drafts, LinkedIn, and X posting flows. |
| [conversation-dump](./skills/conversation-dump) | Export a full readable Markdown transcript of the current Pi conversation. |
| [exif-stripper](./skills/exif-stripper) | Strip sensitive EXIF metadata from images before publishing to the web. |
| [iac-security-scanner](./skills/iac-security-scanner) | Scan Terraform, Kubernetes, CloudFormation, ARM templates, and Dockerfiles for security misconfigurations with NIST mappings. |
| [image-generator](./skills/image-generator) | Generate and edit images through Gemini image models. |
| [huggingface-backup](./skills/huggingface-backup) | Safely back up local folders to private Hugging Face Buckets using `hf` and the `hf-buckets` extension. |
| [jot](./skills/jot) | Append quick notes to a configured Obsidian daily note. |
| [linear](./skills/linear) | Manage Linear issues, projects, cycles, and status workflows through the Linear MCP server. |
| [made-to-stick](./skills/made-to-stick) | Apply the SUCCESs framework to make ideas, copy, and content more memorable. |
| [mesh-security](./skills/mesh-security) | Analyze Istio, Consul, and Linkerd service mesh configurations for security issues and NIST control mappings. |
| [mischief-managed](./skills/mischief-managed) | Capture a lean end-of-session note into an Obsidian vault with decisions, changes, validation, caveats, and follow-ups. |
| [pi-subagents](./skills/pi-subagents) | Instructions for delegating work to the local subagent extension. |
| [security-review](./skills/security-review) | Perform high-signal security reviews of pending branch changes with explicit false-positive filtering. |
| [autoresearch-create](./skills/autoresearch-create) | Start an autonomous optimization experiment loop. |
| [autoresearch-finalize](./skills/autoresearch-finalize) | Finalize autoresearch sessions into reviewable branches. |
| [autoresearch-hooks](./skills/autoresearch-hooks) | Author pre/post iteration hooks for autoresearch. |
