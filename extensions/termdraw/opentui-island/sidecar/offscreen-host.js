import { TextAttributes, getBaseAttributes, } from "@opentui/core";
import { createTestRenderer } from "@opentui/core/testing";
import { createRoot, flushSync } from "@opentui/react";
import { Readable, Writable } from "node:stream";
class NullWriteStream extends Writable {
    columns;
    rows;
    isTTY = true;
    constructor(width, height) {
        super();
        this.columns = width;
        this.rows = height;
    }
    _write(_chunk, _encoding, callback) {
        callback();
    }
}
class NullReadStream extends Readable {
    isTTY = true;
    _read() { }
    setRawMode(_enabled) {
        return this;
    }
}
function cursorFromRenderer(renderer) {
    const cursor = renderer.getCursorState();
    return {
        x: cursor.x,
        y: cursor.y,
        visible: cursor.visible,
    };
}
function colorFromCaptured(color) {
    const [r, g, b, a] = color.toInts();
    if (a === 0) {
        return undefined;
    }
    return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}
function spanFromCaptured(span) {
    const attributes = getBaseAttributes(span.attributes);
    return {
        text: span.text,
        width: span.width,
        fg: colorFromCaptured(span.fg),
        bg: colorFromCaptured(span.bg),
        bold: (attributes & TextAttributes.BOLD) !== 0,
        italic: (attributes & TextAttributes.ITALIC) !== 0,
        underline: (attributes & TextAttributes.UNDERLINE) !== 0,
    };
}
function lineFromCaptured(line) {
    return {
        spans: line.spans.map(spanFromCaptured),
    };
}
function frameFromCaptured(frame, renderer) {
    return {
        width: frame.cols,
        height: frame.rows,
        lines: frame.lines.map(lineFromCaptured),
        cursor: cursorFromRenderer(renderer),
    };
}
function mouseModifiers(input) {
    return {
        shift: input.shift,
        alt: input.alt,
        ctrl: input.ctrl,
    };
}
/** Create an offscreen OpenTUI host backed by the built-in test renderer. */
export async function createOffscreenOpenTuiHost(options) {
    const stdout = new NullWriteStream(options.size.width, options.size.height);
    const stdin = new NullReadStream();
    const rendererSetup = await createTestRenderer({
        width: options.size.width,
        height: options.size.height,
        stdin: stdin,
        stdout: stdout,
        kittyKeyboard: options.kittyKeyboard,
        otherModifiersMode: options.otherModifiersMode,
    });
    const root = createRoot(rendererSetup.renderer);
    let destroyed = false;
    let focused = true;
    const ensureActive = () => {
        if (destroyed) {
            throw new Error("OpenTUI host has already been destroyed.");
        }
    };
    return {
        mount(tree) {
            ensureActive();
            flushSync(() => {
                root.render(tree);
            });
        },
        resize(size) {
            ensureActive();
            stdout.columns = size.width;
            stdout.rows = size.height;
            rendererSetup.resize(size.width, size.height);
        },
        focus() {
            ensureActive();
            focused = true;
        },
        blur() {
            ensureActive();
            focused = false;
        },
        async sendKey(input) {
            ensureActive();
            if (!focused) {
                return;
            }
            rendererSetup.renderer.stdin.emit("data", Buffer.from(input.sequence));
        },
        async sendMouse(input) {
            ensureActive();
            if (!focused) {
                return;
            }
            if (input.type === "scroll") {
                await rendererSetup.mockMouse.scroll(input.x, input.y, input.direction ?? "down", {
                    modifiers: mouseModifiers(input),
                });
                return;
            }
            await rendererSetup.mockMouse.emitMouseEvent(input.type, input.x, input.y, input.button, {
                modifiers: mouseModifiers(input),
            });
        },
        async renderFrame() {
            ensureActive();
            await rendererSetup.renderOnce();
            await new Promise((resolve) => setTimeout(resolve, 0));
            await rendererSetup.renderOnce();
            return frameFromCaptured(rendererSetup.captureSpans(), rendererSetup.renderer);
        },
        async destroy() {
            if (destroyed) {
                return;
            }
            destroyed = true;
            flushSync(() => {
                root.unmount();
            });
            rendererSetup.renderer.destroy();
        },
    };
}
