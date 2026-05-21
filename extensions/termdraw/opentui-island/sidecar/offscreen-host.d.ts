import type { ReactNode } from "react";
import type { HostFrame, HostMouseInput } from "../core/types.js";
export interface CreateOffscreenOpenTuiHostOptions {
    size: {
        width: number;
        height: number;
    };
    kittyKeyboard?: boolean;
    otherModifiersMode?: boolean;
}
export interface OffscreenOpenTuiHost {
    mount(tree: ReactNode): void;
    resize(size: {
        width: number;
        height: number;
    }): void;
    focus(): void;
    blur(): void;
    sendKey(input: {
        sequence: string;
    }): Promise<void>;
    sendMouse(input: HostMouseInput): Promise<void>;
    renderFrame(): Promise<HostFrame>;
    destroy(): Promise<void>;
}
/** Create an offscreen OpenTUI host backed by the built-in test renderer. */
export declare function createOffscreenOpenTuiHost(options: CreateOffscreenOpenTuiHostOptions): Promise<OffscreenOpenTuiHost>;
