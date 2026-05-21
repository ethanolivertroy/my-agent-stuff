export type OpenTuiReadyState = "loading" | "ready" | "error";
export interface OpenTuiReadySnapshot {
    state: OpenTuiReadyState;
    error: Error | null;
}
export interface OpenTuiReadyCallbacks {
    onReady?: () => void;
    onError?: (error: Error) => void;
    onReadyStateChange?: (snapshot: OpenTuiReadySnapshot) => void;
}
/** Tracks one adapter's current loading state and exposes one waitable ready promise per cycle. */
export declare class OpenTuiReadyTracker {
    private callbacks;
    private state;
    private error;
    private pending;
    private pendingSettled;
    constructor(callbacks?: OpenTuiReadyCallbacks);
    updateCallbacks(callbacks: OpenTuiReadyCallbacks): void;
    getSnapshot(): OpenTuiReadySnapshot;
    isReady(): boolean;
    waitUntilReady(): Promise<void>;
    startLoading(): void;
    markReady(): void;
    markError(error: Error): void;
    private transitionTo;
}
export type IslandReadyState = OpenTuiReadyState;
export type IslandReadySnapshot = OpenTuiReadySnapshot;
export type IslandReadyCallbacks = OpenTuiReadyCallbacks;
