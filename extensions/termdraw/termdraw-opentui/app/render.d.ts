/**
 * Rendering helpers for the termDRAW app chrome and editor surface.
 *
 * This file draws the outer frame, palette, selection overlays, cursor, and the small-screen
 * fallback message while leaving `TermDrawRenderable` to coordinate state and lifecycle.
 */
import { type OptimizedBuffer } from "@opentui/core";
import type { DrawState } from "../draw-state.js";
import type { AppLayout, ColorSwatch, DiagramSavePromptLayout, StyleButton, ToolButton } from "./types.js";
/** Draws the small-screen fallback message when the full chrome cannot fit. */
export declare function drawTooSmallMessage(frameBuffer: OptimizedBuffer, width: number, height: number): void;
/** Draws the full-chrome frame, header, divider, and footer rows. */
export declare function drawChrome(frameBuffer: OptimizedBuffer, width: number, height: number, state: DrawState, layout: AppLayout, footerTextOverride: string | null, canSaveDiagram: boolean): void;
/** Draws the right-hand palette region including tool buttons, styles, and colors. */
export declare function drawToolPalette(frameBuffer: OptimizedBuffer, state: DrawState, layout: AppLayout, toolButtons: ToolButton[], styleButtons: StyleButton[], colorSwatches: ColorSwatch[]): void;
/** Draws the retained canvas contents plus selection, marquee, preview, and cursor overlays. */
export declare function drawCanvas(frameBuffer: OptimizedBuffer, state: DrawState): void;
/** Draws the minimal save-as prompt used for native diagram persistence. */
export declare function drawDiagramSavePrompt(frameBuffer: OptimizedBuffer, promptLayout: DiagramSavePromptLayout | null): void;
//# sourceMappingURL=render.d.ts.map