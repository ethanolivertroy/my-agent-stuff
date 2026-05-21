import { TUI, type Component, type Focusable, type Terminal } from "@earendil-works/pi-tui";
import type { OpenTuiBridgeEvent, OpenTuiBridgeEventOfType, OpenTuiBridgePayload, OpenTuiBridgeWaitOptions } from "../../core/bridge.js";
import { OpenTuiIslandController } from "../../core/controller.js";
import type { CreateOpenTuiHostOptions, OpenTuiHost } from "../../core/host.js";
import type { OpenTuiIslandProps, OpenTuiIslandSource } from "../../core/island.js";
import type { OpenTuiReadyCallbacks } from "../../core/ready.js";
import type { HostMouseInput } from "../../core/types.js";
export interface CreatePiTuiOpenTuiSurfaceOptions extends Omit<CreateOpenTuiHostOptions, "size">, OpenTuiReadyCallbacks {
    height: number;
    island?: OpenTuiIslandSource;
    requestRender?: () => void;
    initialWidth?: number;
    controller?: OpenTuiIslandController;
    host?: OpenTuiHost;
}
export type CreatePiTuiSurfaceOptions = CreatePiTuiOpenTuiSurfaceOptions;
export interface CreatePiTuiOpenTuiModalOptions extends Omit<CreatePiTuiOpenTuiSurfaceOptions, "requestRender" | "initialWidth"> {
    tui: Pick<TUI, "addInputListener" | "requestRender" | "setFocus" | "terminal">;
    closeOn: readonly string[];
    enableMouse?: boolean;
    focusOnOpen?: boolean;
    closeWaitOptions?: OpenTuiBridgeWaitOptions;
}
export type CreatePiTuiModalOptions = CreatePiTuiOpenTuiModalOptions;
export interface PiTuiOpenTuiModal<TEvent extends OpenTuiBridgeEvent = OpenTuiBridgeEvent> {
    surface: PiTuiOpenTuiSurface;
    result: Promise<TEvent>;
    focus(): void;
    waitForResult(): Promise<TEvent>;
    sync(): Promise<void>;
    destroy(): Promise<void>;
}
export type PiTuiModal<TEvent extends OpenTuiBridgeEvent = OpenTuiBridgeEvent> = PiTuiOpenTuiModal<TEvent>;
export interface PiTuiScreenBounds {
    row: number;
    col: number;
    width?: number;
    height?: number;
}
/** A fixed-height pi-tui component that hosts one OpenTUI island. */
export declare class PiTuiOpenTuiSurface implements Component, Focusable {
    wantsKeyRelease: boolean;
    private readonly controller;
    private readonly height;
    private readonly requestRender;
    private lastWidth;
    private cachedFrame;
    private cachedLines;
    private syncPromise;
    private pendingWidth;
    private _focused;
    private screenBounds;
    constructor(params: {
        controller: OpenTuiIslandController;
        height: number;
        initialWidth: number;
        requestRender?: () => void;
    });
    setScreenBounds(bounds: PiTuiScreenBounds | null): void;
    getScreenBounds(): {
        row: number;
        col: number;
        width: number;
        height: number;
    } | null;
    get focused(): boolean;
    get ready(): boolean;
    get readyState(): import("../../core/ready.js").OpenTuiReadyState;
    get readyError(): Error | null;
    set focused(value: boolean);
    /** Resolve once the current load cycle has produced a ready frame. */
    waitUntilReady(): Promise<void>;
    private runInBackground;
    private applyFrame;
    private runSyncLoop;
    /** Ensure the cached pi-tui lines reflect the current OpenTUI frame at this width. */
    sync(width?: number): Promise<void>;
    /** Replace the hosted island and refresh the cached pi-tui output. */
    setIsland(island: OpenTuiIslandSource): Promise<void>;
    /** Update the mounted island props without swapping to a different module export. */
    updateProps(props?: OpenTuiIslandProps): Promise<void>;
    onEvent(handler: (event: OpenTuiBridgeEvent) => void): () => void;
    onEvent<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload>(type: TType, handler: (event: OpenTuiBridgeEventOfType<TType, TPayload>) => void): () => void;
    sendCommand(event: OpenTuiBridgeEvent): Promise<void>;
    waitForEvent<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload>(type: TType, options?: OpenTuiBridgeWaitOptions): Promise<OpenTuiBridgeEventOfType<TType, TPayload>>;
    waitForEvent<TEvent extends OpenTuiBridgeEvent = OpenTuiBridgeEvent>(match: (event: OpenTuiBridgeEvent) => event is TEvent, options?: OpenTuiBridgeWaitOptions): Promise<TEvent>;
    /** Forward one raw pi-tui input sequence into the hosted OpenTUI island. */
    sendInput(data: string): Promise<void>;
    /** Forward one translated mouse event into the hosted OpenTUI island. */
    sendMouse(input: HostMouseInput): Promise<void>;
    private dispatchMouseEvent;
    handleTerminalInput(data: string, options?: {
        focus?: () => void;
    }): {
        consume: boolean;
    } | undefined;
    handleInput(data: string): void;
    invalidate(): void;
    render(width: number): string[];
    destroy(): Promise<void>;
}
export type PiTuiSurface = PiTuiOpenTuiSurface;
export declare function enablePiTuiMouseMode(terminal: Pick<Terminal, "write">): void;
export declare function disablePiTuiMouseMode(terminal: Pick<Terminal, "write">): void;
export declare function attachPiTuiMouseSupport(tui: Pick<TUI, "addInputListener" | "setFocus" | "terminal">, surface: PiTuiOpenTuiSurface): () => void;
/**
 * Create a modal-style pi-tui helper that owns surface focus, optional mouse support,
 * close-on-event waiting, and teardown around one hosted island.
 */
export declare function createPiTuiOpenTuiModal<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload>(options: CreatePiTuiOpenTuiModalOptions): Promise<PiTuiOpenTuiModal<OpenTuiBridgeEvent<TType, TPayload>>>;
export declare const createPiTuiModal: typeof createPiTuiOpenTuiModal;
/** Create a pi-tui component that renders a hosted OpenTUI island. */
export declare function createPiTuiOpenTuiSurface(options: CreatePiTuiOpenTuiSurfaceOptions): Promise<PiTuiOpenTuiSurface>;
export declare const createPiTuiSurface: typeof createPiTuiOpenTuiSurface;
