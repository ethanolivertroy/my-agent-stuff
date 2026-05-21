# Upstream Pi package sources

This repo keeps formerly third-party Pi packages as first-class source in the normal `agent-stuff` layout (`extensions/`, `skills/`, and `commands/`) instead of loading them directly from npm or git.

| Local path | Upstream source | Snapshot migrated | Notes |
| --- | --- | --- | --- |
| `extensions/ollama-web-search.ts` | `npm:@ollama/pi-web-search` | `0.0.5` | Local Ollama `web_search` and `web_fetch` tools. Upstream MIT license text is in `docs/LICENSE-ollama-pi-web-search`. |
| `extensions/termdraw/` | `npm:@termdraw/pi` | `0.4.1` | `/termdraw` overlay command. Upstream MIT license is preserved in `extensions/termdraw/LICENSE`. |
| `extensions/voipi/` | `git:github.com/pithings/voipi` | root package `0.0.12` / Pi package `0.0.4` | TTS tools and commands. Upstream MIT license is preserved in `extensions/voipi/LICENSE`. |
| `extensions/subagents/`, `skills/pi-subagents/`, `commands/*.md` | `npm:pi-subagents` | `0.24.4` | Subagent orchestration tool, built-in agents, skill, and prompt templates. Upstream package metadata declares MIT. |
| `extensions/autoresearch/`, `skills/autoresearch-*` | `npm:pi-autoresearch` | `1.4.0` | Autoresearch tools, dashboard, hooks, and skills. Upstream MIT license is preserved in `extensions/autoresearch/LICENSE`. |

Maintenance rule: future changes should be made directly in these first-class paths. Do not re-add the upstream packages to `~/.pi/agent/settings.json`; use upstream only as reference material when intentionally porting a patch.
