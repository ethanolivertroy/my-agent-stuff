/** @jsxImportSource react */
import type { OpenTuiBridgeEvent } from "../../core/bridge.js";
import type { OpenTuiIslandController } from "../../core/controller.js";
import type { CreateOpenTuiHostOptions } from "../../core/host.js";
import { type OpenTuiIslandSource } from "../../core/island.js";
import { type OpenTuiReadyCallbacks } from "../../core/ready.js";
export interface InkOpenTuiSurfaceProps extends Omit<CreateOpenTuiHostOptions, "size">, OpenTuiReadyCallbacks {
    island?: OpenTuiIslandSource;
    width?: number;
    height: number;
    isActive?: boolean;
    fallback?: string;
    onEvent?: (event: OpenTuiBridgeEvent) => void;
    controller?: OpenTuiIslandController;
}
export type InkSurfaceProps = InkOpenTuiSurfaceProps;
/** Render an offscreen OpenTUI island inside an Ink layout region. */
export declare function InkOpenTuiSurface({ island, width, height, isActive, fallback, onReady, onError, onEvent, onReadyStateChange, kittyKeyboard, otherModifiersMode, controller, }: InkOpenTuiSurfaceProps): import("react/jsx-runtime").JSX.Element;
export declare const InkSurface: typeof InkOpenTuiSurface;
