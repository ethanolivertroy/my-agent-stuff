/**
 * Scene-buffer helpers for draw-state rendering.
 *
 * This file builds and updates the intermediate canvas, color, and connection grids used to
 * compose box borders and other rendered output into final terminal cells.
 */
import type { CanvasGrid, ColorGrid, ConnectionGrid, ConnectionStyle, Direction, InkColor, Rect } from "./types.js";
/** Creates an empty character canvas initialized with spaces. */
export declare function createCanvas(width: number, height: number): CanvasGrid;
/** Creates an empty color grid initialized with `null`. */
export declare function createColorGrid(width: number, height: number): ColorGrid;
/** Creates a grid for storing box-edge connectivity between neighboring cells. */
export declare function createConnectionGrid(width: number, height: number): ConnectionGrid;
/**
 * Adjusts a connection count for a cell edge and its neighboring reciprocal edge.
 *
 * Updating both sides keeps box composition symmetric so later glyph lookup can infer corners,
 * tees, and crosses from simple directional presence.
 */
export declare function adjustConnection(grid: ConnectionGrid, width: number, height: number, x: number, y: number, direction: Direction, style: ConnectionStyle, delta: number): void;
/** Paints the color for both cells touched by a directional connection segment. */
export declare function paintConnectionColor(grid: ColorGrid, width: number, height: number, x: number, y: number, direction: Direction, color: InkColor): void;
/** Iterates over each edge segment that forms a rectangle perimeter. */
export declare function applyBoxPerimeter(rect: Rect, applySegment: (x: number, y: number, direction: Direction) => void): void;
/** Returns the canonical border glyph set for a box connection style. */
export declare function getBoxBorderGlyphs(style: ConnectionStyle): {
    horizontal: string;
    vertical: string;
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
};
/**
 * Resolves the final box-drawing glyph for a cell based on its directional connection counts.
 *
 * Heavy and double segments win over light ones so mixed overlaps stay visually consistent.
 */
export declare function getConnectionGlyph(grid: ConnectionGrid, x: number, y: number, width: number, height: number): string;
//# sourceMappingURL=scene.d.ts.map