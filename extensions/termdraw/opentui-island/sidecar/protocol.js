export const OPENTUI_SIDECAR_PROTOCOL = "opentui-island";
export const OPENTUI_SIDECAR_PROTOCOL_VERSION = 1;
export function isOpenTuiSidecarEventMessage(value) {
    return typeof value === "object" && value !== null && "event" in value;
}
