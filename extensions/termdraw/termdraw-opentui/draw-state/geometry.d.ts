/**
 * Low-level geometry helpers for draw-state internals.
 *
 * This file covers rectangle normalization, containment/intersection checks, perimeter
 * extraction, and a few tiny math primitives used across selection and transforms.
 */
import type { Point, Rect } from "./types.js";
/** Clamps a numeric value into the inclusive `[min, max]` range. */
export declare function clamp(value: number, min: number, max: number): number;
/** Builds a normalized rectangle whose edges are ordered regardless of drag direction. */
export declare function normalizeRect(start: Point, end: Point): Rect;
/** Returns whether the point lies within the inclusive rectangle bounds. */
export declare function rectContainsPoint(rect: Rect, x: number, y: number): boolean;
/**
 * Returns the unique perimeter cells for a rectangle.
 *
 * A map is used so degenerate one-cell or one-row rectangles do not emit duplicate points.
 */
export declare function getRectPerimeterPoints(rect: Rect): Point[];
/** Returns whether the rectangle has a non-negative width and height. */
export declare function isValidRect(rect: Rect): boolean;
/** Returns whether `inner` is fully contained inside `outer`. */
export declare function rectContainsRect(outer: Rect, inner: Rect): boolean;
/** Returns whether two inclusive rectangles overlap at all. */
export declare function rectsIntersect(a: Rect, b: Rect): boolean;
/** Returns the inclusive cell area of a rectangle. */
export declare function getRectArea(rect: Rect): number;
//# sourceMappingURL=geometry.d.ts.map