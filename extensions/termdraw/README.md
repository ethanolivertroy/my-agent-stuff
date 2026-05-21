# termDRAW Pi extension

This local extension embeds termDRAW inside Pi using the copied `opentui-island` helper so you can open the editor as a full-screen Pi overlay and insert drawings back into the current editor.

## Usage

Inside Pi:

```text
/termdraw
```

Use `Enter` or `Ctrl+S` to insert the drawing into Pi. Use `Ctrl+Q` to close without inserting.

## Local development

This repo's root `package.json` loads `./extensions`, so the command is available when `my-agent-stuff` is installed as a Pi package.

For a one-off test:

```bash
pi -e ./extensions/termdraw/index.ts
```

## Smoke test

There is a tmux-based end-to-end smoke test that verifies:

- Pi starts with the extension loaded
- `/termdraw` opens the embedded overlay
- saving returns the drawing back into the Pi editor

Run it from the repo root:

```bash
bun run smoke:pi
```

Requirements:

- `pi` installed and on `PATH`
- `tmux` installed

Set `PI_TERMDRAW_SMOKE_KEEP_SESSION=1` if you want the tmux session left alive for debugging on exit.

## Notes

- Requires Bun 1.3+ on the machine running Pi.
- The embedded island currently loads from source (`islands/termdraw.island.tsx`) via Bun.
- A local copy of `opentui-island@0.4.x` is used for save/cancel result bridging.
- The local copy runs on `@opentui/*@0.2.15` to avoid the vulnerable OpenTUI 0.1.x dependency tree.
- This package targets the terminal Pi experience first. GUI support will depend on Pi's extension UI surface.

## License

MIT. See [LICENSE](LICENSE).
