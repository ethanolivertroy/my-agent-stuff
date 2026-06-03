# grok-cli

A Pi extension for `my-agent-stuff` that registers a `grok-cli` provider backed by the official Grok CLI login session.

If this works:

```bash
grok -p "say hi"
```

then Pi can use the same `~/.grok/auth.json` token against Grok's CLI chat proxy.

## What this version adds

- Reads the installed Grok CLI version from `~/.grok/version.json`.
- Reads available models from `~/.grok/models_cache.json`, with safe fallbacks.
- Uses the Grok-required proxy headers, including `x-grok-model-override` per model.
- Provides `/grok-status` and `/grok-refresh` commands.
- Avoids printing tokens in diagnostics.
- Falls back to browser PKCE OAuth if `grok login` has not been run.

## Local run

```bash
pi -e ./extensions/grok-cli --provider grok-cli --model grok-build
```

Fast Composer:

```bash
pi -e ./extensions/grok-cli --provider grok-cli --model grok-composer-2.5-fast
```

Print-mode smoke test:

```bash
pi -e ./extensions/grok-cli --provider grok-cli --model grok-composer-2.5-fast --no-builtin-tools -p "Say hi in exactly three words."
```

## Install from local checkout

```bash
pi install /path/to/my-agent-stuff
```

Then:

```bash
pi --provider grok-cli --model grok-build
```

## Configuration

Environment variables:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PI_GROK_PROVIDER_NAME` | `grok-cli` | Override the registered Pi provider name. |
| `GROK_CLI_CHAT_PROXY_BASE_URL` | `https://cli-chat-proxy.grok.com/v1` | Override the proxy base URL. Must be an HTTPS `*.grok.com` or `*.x.ai` host. |
| `PI_GROK_LOGIN_PORT` | `56121` | Loopback port used only for the fallback browser OAuth flow. |

## Commands

- `/grok-status` — shows provider, CLI version, auth presence, and model IDs without exposing tokens.
- `/grok-refresh` — reloads `~/.grok/auth.json`, `version.json`, and `models_cache.json` without restarting Pi.

## Notes

This is not the public xAI API at `https://api.x.ai/v1`. It follows the same CLI proxy path as Grok Build.
