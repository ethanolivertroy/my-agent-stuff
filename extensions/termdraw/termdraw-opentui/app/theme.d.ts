/**
 * Theme constants and option tables for the termDRAW app renderable.
 *
 * This file centralizes palette sizing, colors, tool hotkeys, canvas insets, and the option
 * lists used to render the chrome and interpret palette interactions.
 */
import { RGBA } from "@opentui/core";
import type { BoxStyle, CanvasInsets, DrawMode, InkColor, LineStyle, TextBorderMode } from "../draw-state.js";
import type { ChromeMode } from "./types.js";
/** Minimum width required to render the full-chrome UI. */
export declare const MIN_WIDTH = 45;
/** Minimum height required to render the full-chrome UI. */
export declare const MIN_HEIGHT = 27;
/** Width reserved for the right-hand tool palette. */
export declare const TOOL_PALETTE_WIDTH = 20;
/** Width of each tool button in the palette. */
export declare const TOOL_BUTTON_WIDTH = 13;
/** Width of each contextual style row. */
export declare const STYLE_BUTTON_WIDTH = 16;
/** Height of each boxed tool button. */
export declare const TOOL_BUTTON_HEIGHT = 3;
/** Width of each ink-color swatch. */
export declare const COLOR_SWATCH_WIDTH = 3;
/** Number of color columns shown in the palette header. */
export declare const COLOR_SWATCH_COLUMNS = 4;
/** Shared UI colors for chrome, selection overlays, and cursor rendering. */
export declare const COLORS: {
    background: RGBA;
    panel: RGBA;
    border: RGBA;
    text: RGBA;
    dim: RGBA;
    select: RGBA;
    accent: RGBA;
    warning: RGBA;
    success: RGBA;
    paint: RGBA;
    preview: RGBA;
    selectionFg: RGBA;
    selectionBg: RGBA;
    handleFg: RGBA;
    handleBg: RGBA;
    cursorFg: RGBA;
    cursorBg: RGBA;
};
/** Available box-style rows for the palette. */
export declare const BOX_STYLE_OPTIONS: {
    style: BoxStyle;
    sample: string;
    label: string;
}[];
/** Available line-style rows for the palette. */
export declare const LINE_STYLE_OPTIONS: {
    style: LineStyle;
    sample: string;
    label: string;
}[];
/** Available elbow-style rows for the palette. */
export declare const ELBOW_STYLE_OPTIONS: {
    style: LineStyle;
    sample: string;
    label: string;
}[];
/** Available brush presets for paint mode. */
export declare const BRUSH_OPTIONS: readonly [{
    readonly brush: "#";
    readonly sample: "###";
    readonly label: "Hash";
}, {
    readonly brush: "*";
    readonly sample: "***";
    readonly label: "Star";
}, {
    readonly brush: "+";
    readonly sample: "+++";
    readonly label: "Plus";
}, {
    readonly brush: "x";
    readonly sample: "xxx";
    readonly label: "Cross";
}, {
    readonly brush: "o";
    readonly sample: "ooo";
    readonly label: "Circle";
}, {
    readonly brush: ".";
    readonly sample: "...";
    readonly label: "Dot";
}, {
    readonly brush: "•";
    readonly sample: "•••";
    readonly label: "Bullet";
}, {
    readonly brush: "░";
    readonly sample: "░░░";
    readonly label: "Light";
}, {
    readonly brush: "▒";
    readonly sample: "▒▒▒";
    readonly label: "Medium";
}, {
    readonly brush: "▓";
    readonly sample: "▓▓▓";
    readonly label: "Heavy";
}];
/** Available text-border rows for text mode. */
export declare const TEXT_BORDER_OPTIONS: {
    style: TextBorderMode;
    sample: string;
    label: string;
}[];
/** Keyboard shortcuts that switch tools outside text entry. */
export declare const TOOL_HOTKEYS: Partial<Record<string, DrawMode>>;
/** Insets used when rendering the full app chrome around the canvas. */
export declare const FULL_CHROME_CANVAS_INSETS: CanvasInsets;
/** Insets used when rendering the bare editor surface without chrome. */
export declare const EDITOR_CANVAS_INSETS: CanvasInsets;
/** Returns the canvas insets for the current chrome mode. */
export declare function getCanvasInsets(chromeMode: ChromeMode): CanvasInsets;
/** Returns the display color associated with the given ink name. */
export declare function getInkColorValue(color: InkColor): RGBA;
/** Returns a readable foreground color for text drawn on top of an ink swatch. */
export declare function getInkColorContrast(color: InkColor): RGBA;
//# sourceMappingURL=theme.d.ts.map