import type { OpenTuiBridgeEvent, OpenTuiBridgeEventOfType, OpenTuiBridgePayload, OpenTuiBridgeWaitOptions } from "./bridge.js";
import type { CreateOpenTuiHostOptions, OpenTuiHost } from "./host.js";
import { type OpenTuiIslandProps, type OpenTuiIslandSource, type ResolvedOpenTuiIslandSource } from "./island.js";
import { type OpenTuiReadyCallbacks } from "./ready.js";
import type { HostFrame, HostKeyInput, HostMouseInput, HostSize } from "./types.js";
export interface CreateOpenTuiIslandControllerOptions extends Omit<Partial<CreateOpenTuiHostOptions>, "size">, OpenTuiReadyCallbacks {
    island?: OpenTuiIslandSource;
    host?: OpenTuiHost;
    size?: HostSize;
}
/** Shared lifecycle controller used by all host adapters. */
export declare class OpenTuiIslandController {
    private currentIsland;
    private cachedFrame;
    private readonly readyTracker;
    private host;
    private readonly hostOptions;
    constructor(host: OpenTuiHost | null, hostOptions: Omit<CreateOpenTuiIslandControllerOptions, "island" | "host" | "onReady" | "onError" | "onReadyStateChange">, readyCallbacks?: OpenTuiReadyCallbacks);
    get ready(): boolean;
    get readyState(): import("./ready.js").OpenTuiReadyState;
    get readyError(): Error | null;
    get island(): ResolvedOpenTuiIslandSource | null;
    get frame(): HostFrame | null;
    waitUntilReady(): Promise<void>;
    private toReadyError;
    private ensureHost;
    private markReadyFrame;
    setIsland(island: OpenTuiIslandSource): Promise<void>;
    updateProps(props?: OpenTuiIslandProps): Promise<void>;
    onEvent(handler: (event: OpenTuiBridgeEvent) => void): () => void;
    onEvent<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload>(type: TType, handler: (event: OpenTuiBridgeEventOfType<TType, TPayload>) => void): () => void;
    sendCommand(event: OpenTuiBridgeEvent): Promise<void>;
    waitForEvent<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload>(type: TType, options?: OpenTuiBridgeWaitOptions): Promise<OpenTuiBridgeEventOfType<TType, TPayload>>;
    waitForEvent<TEvent extends OpenTuiBridgeEvent = OpenTuiBridgeEvent>(match: (event: OpenTuiBridgeEvent) => event is TEvent, options?: OpenTuiBridgeWaitOptions): Promise<TEvent>;
    resize(size: HostSize): Promise<void>;
    syncFrame(size?: HostSize): Promise<HostFrame>;
    focus(): Promise<void>;
    blur(): Promise<void>;
    sendKey(input: HostKeyInput): Promise<void>;
    sendMouse(input: HostMouseInput): Promise<void>;
    destroy(): Promise<void>;
}
export declare function createOpenTuiIslandController(options: CreateOpenTuiIslandControllerOptions): Promise<OpenTuiIslandController>;
export type CreateIslandControllerOptions = CreateOpenTuiIslandControllerOptions;
export type IslandController = OpenTuiIslandController;
export declare const createIslandController: typeof createOpenTuiIslandController;
