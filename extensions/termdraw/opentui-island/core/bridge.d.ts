import type { OpenTuiIslandValue } from "./island.js";
export type OpenTuiBridgePayload = OpenTuiIslandValue;
export interface OpenTuiBridgeEvent<TType extends string = string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload> {
    type: TType;
    payload: TPayload;
}
export type OpenTuiBridgeEventOfType<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload> = OpenTuiBridgeEvent<TType, TPayload>;
export interface OpenTuiBridgeWaitOptions {
    timeoutMs?: number;
}
export type OpenTuiBridgeEventHandler = (event: OpenTuiBridgeEvent) => void;
/** Normalize the shorthand `type, payload` form into a full bridge event object. */
export declare function toOpenTuiBridgeEvent<TType extends string, TPayload extends OpenTuiBridgePayload>(typeOrEvent: TType | OpenTuiBridgeEvent<TType, TPayload>, payload?: TPayload): OpenTuiBridgeEvent<TType, TPayload>;
export interface OpenTuiIslandBridge {
    emit(event: OpenTuiBridgeEvent): void;
    emit<TType extends string, TPayload extends OpenTuiBridgePayload>(type: TType, payload: TPayload): void;
    onCommand(handler: OpenTuiBridgeEventHandler): () => void;
}
export declare const OpenTuiIslandBridgeProvider: import("react").Provider<OpenTuiIslandBridge | null>;
/** Access the island bridge inside a Bun-rendered OpenTUI island. */
export declare function useOpenTuiIslandBridge(): OpenTuiIslandBridge;
export type BridgePayload = OpenTuiBridgePayload;
export type BridgeEvent<TType extends string = string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload> = OpenTuiBridgeEvent<TType, TPayload>;
export type BridgeEventOfType<TType extends string, TPayload extends OpenTuiBridgePayload = OpenTuiBridgePayload> = OpenTuiBridgeEventOfType<TType, TPayload>;
export type BridgeWaitOptions = OpenTuiBridgeWaitOptions;
export type BridgeEventHandler = OpenTuiBridgeEventHandler;
export type IslandBridge = OpenTuiIslandBridge;
export declare const IslandBridgeProvider: import("react").Provider<OpenTuiIslandBridge | null>;
export declare const toBridgeEvent: typeof toOpenTuiBridgeEvent;
export declare const useIslandBridge: typeof useOpenTuiIslandBridge;
