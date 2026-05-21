import { jsx as _jsx } from "react/jsx-runtime";
/** @jsxImportSource react */
import { Box, Text, useBoxMetrics, useInput, useStdin, useStdout, useWindowSize } from "ink";
import { useEffect, useRef, useState } from "react";
import { hostFrameToAnsiLines } from "../../core/ansi.js";
import { resolveOpenTuiIslandSource, } from "../../core/island.js";
import { OpenTuiReadyTracker } from "../../core/ready.js";
import { DISABLE_SGR_MOUSE_MODE, ENABLE_SGR_MOUSE_MODE, parseSgrMouseStream, } from "../../core/terminal-mouse.js";
import { createOpenTuiSidecarHost } from "../../sidecar/client.js";
function samePropsJson(left, right) {
    return JSON.stringify(left ?? null) === JSON.stringify(right ?? null);
}
function normalizeLines(lines, width, height) {
    const normalizedWidth = Math.max(1, width);
    const visible = lines.slice(0, height);
    while (visible.length < height) {
        visible.push(" ".repeat(normalizedWidth));
    }
    return visible;
}
function inputToSequence(input, key) {
    if (key.upArrow)
        return "\u001B[A";
    if (key.downArrow)
        return "\u001B[B";
    if (key.leftArrow)
        return "\u001B[D";
    if (key.rightArrow)
        return "\u001B[C";
    if (key.return)
        return "\r";
    if (key.escape)
        return "\u001B";
    if (key.tab)
        return "\t";
    if (key.backspace)
        return "\u007F";
    if (key.delete)
        return "\u001B[3~";
    if (key.home)
        return "\u001B[H";
    if (key.end)
        return "\u001B[F";
    if (key.pageUp)
        return "\u001B[5~";
    if (key.pageDown)
        return "\u001B[6~";
    return input.length > 0 ? input : undefined;
}
function hasSameIslandTarget(currentIsland, nextIsland) {
    return (currentIsland?.module === nextIsland.module &&
        currentIsland.exportName === nextIsland.exportName);
}
function toInputString(data) {
    if (typeof data === "string") {
        return data;
    }
    return Buffer.from(data).toString("utf8");
}
function eventInsideBounds(event, bounds) {
    return (event.x >= bounds.left &&
        event.x < bounds.left + bounds.width &&
        event.y >= bounds.top &&
        event.y < bounds.top + bounds.height);
}
function getAbsoluteBounds(ref, width, height) {
    const element = ref.current;
    if (!element) {
        return null;
    }
    let left = 0;
    let top = 0;
    let current = element;
    while (current) {
        left += current.yogaNode?.getComputedLeft() ?? 0;
        top += current.yogaNode?.getComputedTop() ?? 0;
        current = current.parentNode;
    }
    return {
        left,
        top,
        width,
        height,
    };
}
/** Render an offscreen OpenTUI island inside an Ink layout region. */
export function InkOpenTuiSurface({ island, width, height, isActive = true, fallback = "Loading OpenTUI island...", onReady, onError, onEvent, onReadyStateChange, kittyKeyboard, otherModifiersMode, controller, }) {
    const windowSize = useWindowSize();
    const { stdin, isRawModeSupported } = useStdin();
    const { stdout } = useStdout();
    const resolvedWidth = Math.max(1, width ?? windowSize.columns);
    const inputActive = isActive && isRawModeSupported;
    const hostRef = useRef(null);
    const controllerRef = useRef(controller ?? null);
    const mountedIslandRef = useRef(null);
    const readyTrackerRef = useRef(new OpenTuiReadyTracker());
    const eventUnsubscribeRef = useRef(null);
    const containerRef = useRef(null);
    const mouseBufferRef = useRef("");
    const suppressMouseKeyUntilRef = useRef(0);
    const metrics = useBoxMetrics(containerRef);
    const [lines, setLines] = useState(() => normalizeLines([fallback], resolvedWidth, height));
    readyTrackerRef.current.updateCallbacks({ onReady, onError, onReadyStateChange });
    const toReadyError = (error) => error instanceof Error ? error : new Error(String(error));
    const sync = async () => {
        try {
            if (controllerRef.current) {
                // Shared-controller mode keeps Ink aligned with pi-tui and lower-level hosts.
                const frame = await controllerRef.current.syncFrame({ width: resolvedWidth, height });
                setLines(normalizeLines(hostFrameToAnsiLines(frame), resolvedWidth, height));
            }
            else if (hostRef.current) {
                // Keep the original Ink-owned host path so the adapter stays stable when no controller is passed in.
                await hostRef.current.resize({ width: resolvedWidth, height });
                const frame = await hostRef.current.renderFrame();
                setLines(normalizeLines(hostFrameToAnsiLines(frame), resolvedWidth, height));
            }
            else {
                return;
            }
            if (readyTrackerRef.current.getSnapshot().state === "loading") {
                readyTrackerRef.current.markReady();
            }
        }
        catch (error) {
            readyTrackerRef.current.markError(toReadyError(error));
            throw error;
        }
    };
    useEffect(() => {
        let cancelled = false;
        const nextIsland = island ?? controller?.island;
        if (!nextIsland) {
            setLines(normalizeLines(["InkOpenTuiSurface needs an island or a controller with one."], resolvedWidth, height));
            readyTrackerRef.current.markError(new Error("InkOpenTuiSurface needs an island or a controller with one."));
            return;
        }
        const resolvedIsland = resolveOpenTuiIslandSource(nextIsland);
        const ensureHost = async () => {
            const previousIsland = mountedIslandRef.current;
            const sameTarget = hasSameIslandTarget(previousIsland, resolvedIsland);
            const shouldUpdateProps = sameTarget && !samePropsJson(previousIsland?.props, resolvedIsland.props);
            const shouldMount = !sameTarget;
            if (!previousIsland || shouldMount || shouldUpdateProps) {
                readyTrackerRef.current.startLoading();
            }
            if (!controllerRef.current && !hostRef.current) {
                // Ink still supports self-managed hosting, but an injected controller lets callers share one lifecycle object across adapters.
                hostRef.current = await createOpenTuiSidecarHost({
                    size: { width: resolvedWidth, height },
                    kittyKeyboard,
                    otherModifiersMode,
                });
                if (onEvent) {
                    eventUnsubscribeRef.current = hostRef.current.onEvent(onEvent);
                }
            }
            if (cancelled) {
                return;
            }
            if (controllerRef.current) {
                if (shouldUpdateProps) {
                    await controllerRef.current.updateProps(resolvedIsland.props);
                }
                else if (shouldMount) {
                    await controllerRef.current.setIsland(resolvedIsland);
                }
                mountedIslandRef.current = resolvedIsland;
                if (isActive)
                    await controllerRef.current.focus();
                else
                    await controllerRef.current.blur();
            }
            else if (hostRef.current) {
                if (shouldUpdateProps) {
                    await hostRef.current.updateProps(resolvedIsland.props);
                }
                else if (shouldMount) {
                    await hostRef.current.mount(resolvedIsland);
                }
                mountedIslandRef.current = resolvedIsland;
                if (isActive)
                    await hostRef.current.focus();
                else
                    await hostRef.current.blur();
            }
            await sync();
        };
        void ensureHost().catch((error) => {
            if (cancelled) {
                return;
            }
            const readyError = toReadyError(error);
            readyTrackerRef.current.markError(readyError);
            const message = readyError.message || "Failed to load OpenTUI island.";
            setLines(normalizeLines([message], resolvedWidth, height));
        });
        return () => {
            cancelled = true;
        };
    }, [island, resolvedWidth, height, kittyKeyboard, otherModifiersMode, isActive, controller]);
    useEffect(() => {
        eventUnsubscribeRef.current?.();
        eventUnsubscribeRef.current = null;
        if (controllerRef.current && onEvent) {
            eventUnsubscribeRef.current = controllerRef.current.onEvent(onEvent);
        }
        else if (hostRef.current && onEvent) {
            eventUnsubscribeRef.current = hostRef.current.onEvent(onEvent);
        }
        return () => {
            eventUnsubscribeRef.current?.();
            eventUnsubscribeRef.current = null;
        };
    }, [onEvent]);
    useEffect(() => {
        return () => {
            eventUnsubscribeRef.current?.();
            eventUnsubscribeRef.current = null;
            const host = hostRef.current;
            const activeController = controllerRef.current;
            hostRef.current = null;
            controllerRef.current = null;
            mountedIslandRef.current = null;
            if (host) {
                void host.destroy();
            }
            if (activeController && !controller) {
                // Only destroy controllers that Ink created itself. Borrowed controllers still belong to the caller.
                void activeController.destroy();
            }
        };
    }, [controller]);
    useInput((input, key) => {
        if ((!controllerRef.current && !hostRef.current) || !inputActive) {
            return;
        }
        if (Date.now() < suppressMouseKeyUntilRef.current &&
            input.length === 1 &&
            (input === "m" || input === "M")) {
            return;
        }
        const sequence = inputToSequence(input, key);
        if (!sequence)
            return;
        void (async () => {
            if (controllerRef.current) {
                await controllerRef.current.sendKey({ sequence });
            }
            else {
                await hostRef.current?.sendKey({ sequence });
            }
            await sync();
        })();
    }, { isActive: inputActive });
    useEffect(() => {
        if (!inputActive || !stdout.isTTY) {
            return;
        }
        stdout.write(ENABLE_SGR_MOUSE_MODE);
        return () => {
            stdout.write(DISABLE_SGR_MOUSE_MODE);
        };
    }, [inputActive, stdout]);
    useEffect(() => {
        if (!inputActive) {
            return;
        }
        const handleMouseData = (data) => {
            mouseBufferRef.current += toInputString(data);
            const parsed = parseSgrMouseStream(mouseBufferRef.current);
            mouseBufferRef.current = parsed.rest;
            if (parsed.events.length === 0 ||
                (!controllerRef.current && !hostRef.current) ||
                !metrics.hasMeasured) {
                return;
            }
            const bounds = getAbsoluteBounds(containerRef, metrics.width, metrics.height);
            if (!bounds) {
                return;
            }
            void (async () => {
                let handledMouse = false;
                for (const event of parsed.events) {
                    if (!eventInsideBounds(event, bounds)) {
                        continue;
                    }
                    handledMouse = true;
                    const localEvent = {
                        ...event,
                        x: event.x - bounds.left,
                        y: event.y - bounds.top,
                    };
                    if (controllerRef.current) {
                        await controllerRef.current.sendMouse(localEvent);
                    }
                    else {
                        await hostRef.current?.sendMouse(localEvent);
                    }
                }
                if (handledMouse) {
                    suppressMouseKeyUntilRef.current = Date.now() + 50;
                    await sync();
                }
            })();
        };
        stdin.on("data", handleMouseData);
        return () => {
            stdin.off("data", handleMouseData);
        };
    }, [inputActive, stdin, metrics.hasMeasured, metrics.width, metrics.height]);
    return (_jsx(Box, { ref: containerRef, flexDirection: "column", width: resolvedWidth, minHeight: height, children: lines.map((line, index) => (_jsx(Text, { children: line }, `line-${index}`))) }));
}
export const InkSurface = InkOpenTuiSurface;
