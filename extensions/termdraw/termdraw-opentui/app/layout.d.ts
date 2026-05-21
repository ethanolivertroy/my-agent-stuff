/**
 * Layout and hit-target helpers for the termDRAW app renderable.
 *
 * This file computes full-chrome layout regions and the palette button geometry shared by
 * rendering and mouse-input handling.
 */
import type { DrawMode, InkColor } from "../draw-state.js";
import type { AppLayout, ColorSwatch, DiagramSavePromptLayout, DiagramSavePromptState, StyleButton, ToolButton } from "./types.js";
/** Returns the frame layout used by the full-chrome app view. */
export declare function getLayout(width: number, height: number): AppLayout;
/** Returns whether a point lies inside the given inclusive-exclusive rectangle. */
export declare function isInsideRect(x: number, y: number, left: number, top: number, width: number, height: number): boolean;
/** Returns the number of style rows rendered beneath the active tool. */
export declare function getContextualStyleRowCount(currentMode: DrawMode): number;
/** Returns the clickable tool buttons for the current palette layout. */
export declare function getToolButtons(layout: AppLayout, currentMode: DrawMode): ToolButton[];
/** Returns the contextual style rows shown beneath the active tool. */
export declare function getContextualStyleButtons(layout: AppLayout, currentMode: DrawMode): StyleButton[];
/** Returns the palette color swatches for the current layout. */
export declare function getColorSwatches(layout: AppLayout, colors: readonly InkColor[]): ColorSwatch[];
/** Returns the computed overlay layout for the diagram save prompt. */
export declare function getDiagramSavePromptLayout(width: number, height: number, prompt: DiagramSavePromptState | null): DiagramSavePromptLayout | null;
/** Returns whether the pointer event lands inside the drawable canvas region. */
export declare function isCanvasChromeEvent(canvasLeftCol: number, canvasTopRow: number, layout: AppLayout, x: number, y: number): boolean;
//# sourceMappingURL=layout.d.ts.map