/**
 * Keyboard and mouse interaction helpers for the termDRAW app renderable.
 *
 * This file keeps chrome hit testing and keybinding dispatch out of `app.ts` while preserving
 * `TermDrawRenderable` as the coordinator that owns callbacks, focus, and render invalidation.
 */
import { type KeyEvent, type MouseEvent } from "@opentui/core";
import type { DrawState } from "../draw-state.js";
import type { AppLayout, ChromeMode, DiagramSavePromptKeyResult, DiagramSavePromptState } from "./types.js";
/** Describes the callbacks needed by the extracted input handlers. */
type InputCallbacks = {
    requestRender: () => void;
    dismissStartupLogo: () => void;
};
/** Handles mouse interaction for the renderable and its full-chrome palette. */
export declare function handleMouseEvent(options: {
    event: MouseEvent;
    x: number;
    y: number;
    state: DrawState;
    chromeMode: ChromeMode;
    layout: AppLayout | null;
} & InputCallbacks): void;
/** Handles keyboard shortcuts and text entry for the renderable. */
export declare function handleKeyPress(options: {
    key: KeyEvent;
    state: DrawState;
    cancelOnCtrlCEnabled: boolean;
    onSave: (() => void) | null;
    onSaveDiagram: (() => void) | null;
    onCancel: (() => void) | null;
} & InputCallbacks): boolean;
/** Handles keyboard input while the diagram save prompt is visible. */
export declare function handleDiagramSavePromptKey(key: KeyEvent, prompt: DiagramSavePromptState | null): DiagramSavePromptKeyResult;
export {};
//# sourceMappingURL=input.d.ts.map