import { resolveOpenTuiIslandSource, } from "./island.js";
import { OpenTuiReadyTracker } from "./ready.js";
import { createOpenTuiSidecarHost } from "../sidecar/client.js";
function hasSameIslandTarget(currentIsland, nextIsland) {
    return (currentIsland?.module === nextIsland.module &&
        currentIsland.exportName === nextIsland.exportName);
}
/** Shared lifecycle controller used by all host adapters. */
export class OpenTuiIslandController {
    currentIsland = null;
    cachedFrame = null;
    readyTracker;
    host;
    hostOptions;
    constructor(host, hostOptions, readyCallbacks) {
        this.host = host;
        this.hostOptions = hostOptions;
        this.readyTracker = new OpenTuiReadyTracker(readyCallbacks);
    }
    get ready() {
        return this.readyTracker.isReady();
    }
    get readyState() {
        return this.readyTracker.getSnapshot().state;
    }
    get readyError() {
        return this.readyTracker.getSnapshot().error;
    }
    get island() {
        return this.currentIsland;
    }
    get frame() {
        return this.cachedFrame;
    }
    async waitUntilReady() {
        if (this.ready) {
            return;
        }
        await this.readyTracker.waitUntilReady();
    }
    toReadyError(error) {
        return error instanceof Error ? error : new Error(String(error));
    }
    async ensureHost(size) {
        if (this.host) {
            return this.host;
        }
        const resolvedSize = size ?? this.hostOptions.size;
        if (!resolvedSize) {
            throw new Error("OpenTUI island controller needs a size before it can start the sidecar.");
        }
        this.host = await createOpenTuiSidecarHost({
            size: resolvedSize,
            kittyKeyboard: this.hostOptions.kittyKeyboard,
            otherModifiersMode: this.hostOptions.otherModifiersMode,
        });
        if (this.currentIsland) {
            await this.host.mount(this.currentIsland);
        }
        return this.host;
    }
    markReadyFrame(frame) {
        this.cachedFrame = frame;
        // Ready means "we have rendered a usable frame", not just "mount/updateProps returned".
        if (this.readyState === "loading") {
            this.readyTracker.markReady();
        }
    }
    async setIsland(island) {
        const resolvedIsland = resolveOpenTuiIslandSource(island);
        this.readyTracker.startLoading();
        try {
            if (hasSameIslandTarget(this.currentIsland, resolvedIsland)) {
                // Reusing the same module/export keeps island-local state intact and turns this into a prop update.
                await this.updateProps(resolvedIsland.props);
                return;
            }
            if (!this.host) {
                this.currentIsland = resolvedIsland;
                this.cachedFrame = null;
                return;
            }
            await this.host.mount(resolvedIsland);
            this.currentIsland = resolvedIsland;
            this.cachedFrame = null;
        }
        catch (error) {
            this.readyTracker.markError(this.toReadyError(error));
            throw error;
        }
    }
    async updateProps(props) {
        if (!this.currentIsland) {
            throw new Error("OpenTUI island has not been mounted yet.");
        }
        this.readyTracker.startLoading();
        try {
            if (!this.host) {
                this.currentIsland = {
                    ...this.currentIsland,
                    props,
                };
                this.cachedFrame = null;
                return;
            }
            await this.host.updateProps(props);
            this.currentIsland = {
                ...this.currentIsland,
                props,
            };
            this.cachedFrame = null;
        }
        catch (error) {
            this.readyTracker.markError(this.toReadyError(error));
            throw error;
        }
    }
    onEvent(typeOrHandler, maybeHandler) {
        if (typeof typeOrHandler === "string") {
            if (!this.host) {
                throw new Error("OpenTUI island controller must be mounted before subscribing to events.");
            }
            return this.host.onEvent(typeOrHandler, maybeHandler ?? (() => { }));
        }
        if (!this.host) {
            throw new Error("OpenTUI island controller must be mounted before subscribing to events.");
        }
        return this.host.onEvent(typeOrHandler);
    }
    async sendCommand(event) {
        if (!this.currentIsland) {
            throw new Error("OpenTUI island has not been mounted yet.");
        }
        const host = await this.ensureHost();
        await host.sendCommand(event);
        this.cachedFrame = null;
    }
    waitForEvent(typeOrMatch, options) {
        if (!this.host) {
            throw new Error("OpenTUI island controller must be mounted before waiting for events.");
        }
        return this.host.waitForEvent(typeOrMatch, options);
    }
    async resize(size) {
        const host = await this.ensureHost(size);
        await host.resize(size);
        this.cachedFrame = null;
    }
    async syncFrame(size) {
        try {
            const host = await this.ensureHost(size);
            if (size) {
                // The controller treats size and frame fetch as one operation so adapters can ask for "the next frame at this size".
                await host.resize(size);
            }
            const frame = await host.renderFrame();
            this.markReadyFrame(frame);
            return frame;
        }
        catch (error) {
            this.readyTracker.markError(this.toReadyError(error));
            throw error;
        }
    }
    async focus() {
        if (!this.host) {
            return;
        }
        await this.host.focus();
    }
    async blur() {
        if (!this.host) {
            return;
        }
        await this.host.blur();
    }
    async sendKey(input) {
        const host = await this.ensureHost();
        await host.sendKey(input);
        this.cachedFrame = null;
    }
    async sendMouse(input) {
        const host = await this.ensureHost();
        await host.sendMouse(input);
        this.cachedFrame = null;
    }
    async destroy() {
        await this.host?.destroy();
    }
}
export async function createOpenTuiIslandController(options) {
    const host = options.host ??
        (options.size
            ? await createOpenTuiSidecarHost({
                size: options.size,
                kittyKeyboard: options.kittyKeyboard,
                otherModifiersMode: options.otherModifiersMode,
            })
            : null);
    const controller = new OpenTuiIslandController(host, {
        size: options.size,
        kittyKeyboard: options.kittyKeyboard,
        otherModifiersMode: options.otherModifiersMode,
    }, {
        onReady: options.onReady,
        onError: options.onError,
        onReadyStateChange: options.onReadyStateChange,
    });
    if (options.island) {
        try {
            await controller.setIsland(options.island);
            if (options.size) {
                await controller.syncFrame(options.size);
            }
        }
        catch (error) {
            await controller.destroy();
            throw error;
        }
    }
    return controller;
}
export const createIslandController = createOpenTuiIslandController;
