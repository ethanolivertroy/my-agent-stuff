import { type ChildProcessWithoutNullStreams } from "node:child_process";
import type { OpenTuiBridgeEvent, OpenTuiBridgeEventOfType, OpenTuiBridgePayload, OpenTuiBridgeWaitOptions } from "../core/bridge.js";
import type { CreateOpenTuiHostOptions, OpenTuiHost } from "../core/host.js";
import { type OpenTuiIslandProps, type OpenTuiIslandSource } from "../core/island.js";
import type { HostFrame, HostKeyInput, HostMouseInput, HostSize } from "../core/types.js";
export interface CreateOpenTuiSidecarHostOptions extends CreateOpenTuiHostOptions {
    bunCommand?: string;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    sidecarPath?: string;
    startupTimeoutMs?: number;
    requestTimeoutMs?: number;
}
export type CreateSidecarHostOptions = CreateOpenTuiSidecarHostOptions;
declare class SidecarOpenTuiHost implements OpenTuiHost {
    private readonly child;
    private readonly bunCommand;
    private readonly requestTimeoutMs;
    private readonly pending;
    private readonly eventListeners;
    private readonly pendingEventWaits;
    private readonly stderrChunks;
    private nextRequestId;
    private closed;
    private destroying;
    constructor(child: ChildProcessWithoutNullStreams, bunCommand: string, requestTimeoutMs: number);
    initialize(options: CreateOpenTuiHostOptions, startupTimeoutMs: number): Promise<this>;
    private isHandshakeResult;
    private verifyProtocol;
    private stderrSuffix;
    private clearPendingTimeout;
    private clearEventWaitTimeout;
    private shutdownProcess;
    private abort;
    private dispatchEvent;
    private handleResponseLine;
    private failAll;
    private request;
    mount(island: OpenTuiIslandSource): Promise<void>;
    updateProps(props?: OpenTuiIslandProps): Promise<void>;
    onEvent(handler: (event: OpenTuiBridgeEvent) => void): () => void;
    onEvent<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload>(type: TType, handler: (event: OpenTuiBridgeEventOfType<TType, TPayload>) => void): () => void;
    sendCommand(event: OpenTuiBridgeEvent): Promise<void>;
    waitForEvent<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload>(type: TType, options?: OpenTuiBridgeWaitOptions): Promise<OpenTuiBridgeEventOfType<TType, TPayload>>;
    waitForEvent<TEvent extends OpenTuiBridgeEvent = OpenTuiBridgeEvent>(match: (event: OpenTuiBridgeEvent) => event is TEvent, options?: OpenTuiBridgeWaitOptions): Promise<TEvent>;
    resize(size: HostSize): Promise<void>;
    focus(): Promise<void>;
    blur(): Promise<void>;
    sendKey(input: HostKeyInput): Promise<void>;
    sendMouse(input: HostMouseInput): Promise<void>;
    renderFrame(): Promise<HostFrame>;
    destroy(): Promise<void>;
}
/** Spawn a Bun sidecar that renders one OpenTUI island offscreen. */
export declare function createOpenTuiSidecarHost(options: CreateOpenTuiSidecarHostOptions): Promise<SidecarOpenTuiHost>;
export declare const createSidecarHost: typeof createOpenTuiSidecarHost;
export {};
