import { createContext, useContext } from "react";
/** Normalize the shorthand `type, payload` form into a full bridge event object. */
export function toOpenTuiBridgeEvent(typeOrEvent, payload) {
    if (typeof typeOrEvent === "string") {
        return {
            type: typeOrEvent,
            payload: payload,
        };
    }
    return typeOrEvent;
}
const OpenTuiIslandBridgeContext = createContext(null);
export const OpenTuiIslandBridgeProvider = OpenTuiIslandBridgeContext.Provider;
/** Access the island bridge inside a Bun-rendered OpenTUI island. */
export function useOpenTuiIslandBridge() {
    const bridge = useContext(OpenTuiIslandBridgeContext);
    if (!bridge) {
        throw new Error("useOpenTuiIslandBridge() must be used inside an opentui-island sidecar mount.");
    }
    return bridge;
}
export const IslandBridgeProvider = OpenTuiIslandBridgeProvider;
export const toBridgeEvent = toOpenTuiBridgeEvent;
export const useIslandBridge = useOpenTuiIslandBridge;
