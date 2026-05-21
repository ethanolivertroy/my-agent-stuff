/**
 * Shared draw-state constants and type definitions.
 *
 * This file defines the object model, tool enums, transient interaction state, render-grid
 * types, and the small constant tables that the rest of the draw-state internals build on.
 */
export const BRUSHES = ["#", "*", "+", "x", "o", ".", "•", "░", "▒", "▓"];
export const BOX_STYLES = ["auto", "light", "heavy", "double", "dashed"];
export const LINE_STYLES = ["smooth", "light", "double", "dashed"];
export const INK_COLORS = [
    "white",
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "magenta",
];
export const TEXT_BORDER_MODES = ["none", "single", "double", "underline"];
export const DRAW_DOCUMENT_VERSION = 1;
export const DEFAULT_CANVAS_INSETS = {
    left: 1,
    top: 3,
    right: 1,
    bottom: 2,
};
