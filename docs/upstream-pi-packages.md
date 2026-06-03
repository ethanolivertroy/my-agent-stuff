# Upstream Pi package sources

This repo keeps formerly third-party Pi packages as first-class source in the normal `agent-stuff` layout (`extensions/`, `skills/`, and `commands/`) instead of loading them directly from npm or git.

| Local path | Upstream source | Snapshot migrated | Notes |
| --- | --- | --- | --- |
| `extensions/ollama-web-search.ts` | `npm:@ollama/pi-web-search` | `0.0.5` | Local Ollama `web_search` and `web_fetch` tools. Upstream MIT license text is in `docs/LICENSE-ollama-pi-web-search`. |
| `extensions/grok-cli/` | `git:github.com/IgorWarzocha/pi-grok-build` | commit `3cb167d`, locally renamed and refactored | Grok CLI-backed `grok-cli` provider for Grok Build/Composer. Upstream MIT license is preserved in `extensions/grok-cli/LICENSE`. |
| `extensions/termdraw/` | `npm:@termdraw/pi`, `npm:@termdraw/opentui`, `npm:opentui-island` | Pi package `0.4.1`, termDRAW OpenTUI `0.4.1`, OpenTUI island `0.4.0` | `/termdraw` overlay command. The runtime helper packages are copied under `extensions/termdraw/` so vulnerable OpenTUI 0.1.x dependencies are no longer installed. MIT license files are preserved in the relevant subdirectories. |
| `extensions/voipi/` | `git:github.com/pithings/voipi` | root package `0.0.12` / Pi package `0.0.4` | TTS tools and commands. Upstream MIT license is preserved in `extensions/voipi/LICENSE`. |
| `extensions/subagents/`, `skills/pi-subagents/`, `commands/*.md` | `npm:pi-subagents` | `0.24.4` | Subagent orchestration tool, built-in agents, skill, and prompt templates. Upstream package metadata declares MIT. |
| `extensions/autoresearch/`, `skills/autoresearch-*` | `npm:pi-autoresearch` | `1.4.0` | Autoresearch tools, dashboard, hooks, and skills. Upstream MIT license is preserved in `extensions/autoresearch/LICENSE`. |

Maintenance rule: future changes should be made directly in these first-class paths. Do not re-add the upstream packages to `~/.pi/agent/settings.json`; use upstream only as reference material when intentionally porting a patch.
