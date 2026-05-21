import type { ElbowOrientation, LineStyle, Point } from "./types.js";
/** Constrains a free line endpoint to the dominant horizontal or vertical axis. */
export declare function constrainLinePoint(anchor: Point, point: Point): Point;
/**
 * Returns the rendered character map for a line.
 *
 * Smooth lines fall back to Braille cells for shallow and steep diagonals so the terminal output
 * looks much closer to the intended vector line.
 */
export declare function getLineRenderCharacters(start: Point, end: Point, style?: LineStyle): Map<string, string>;
export declare function getElbowRenderCharacters(start: Point, end: Point, style?: LineStyle, orientation?: ElbowOrientation): Map<string, string>;
/** Parses a `"x,y"` map key back into a point. */
export declare function pointFromKey(key: string): Point;
/** Returns the rendered cell coordinates occupied by a line. */
export declare function getLineRenderCells(start: Point, end: Point, style?: LineStyle): Point[];
/** Returns the rendered cell coordinates occupied by an elbow connector. */
export declare function getElbowRenderCells(start: Point, end: Point, style?: LineStyle, orientation?: ElbowOrientation): Point[];
/** Returns Bresenham points for the line segment between the endpoints. */
export declare function getLinePoints(x0: number, y0: number, x1: number, y1: number): Point[];
/** Merges points while preserving the original order of the first occurrence of each cell. */
export declare function mergeUniquePoints(existing: Point[], next: Point[]): Point[];
/** Extends an in-progress paint stroke with the cells between two drag positions. */
export declare function appendPaintSegment(points: Point[], from: Point, to: Point): Point[];
/** Returns whether two point lists are identical in both length and order. */
export declare function pointsEqual(a: Point[], b: Point[]): boolean;
//# sourceMappingURL=line.d.ts.map