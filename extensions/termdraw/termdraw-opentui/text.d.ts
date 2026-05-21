/**
 * Shared terminal-text helpers.
 *
 * This file contains grapheme-aware text measurement and truncation utilities plus the
 * geometry helpers used to render and select bordered text objects.
 */
import type { Point, Rect, TextObject } from "./draw-state/types.js";
/** Splits text into terminal cells using grapheme segmentation rather than UTF-16 code units. */
export declare function splitGraphemes(input: string): string[];
/** Truncates text to a maximum number of terminal cells. */
export declare function truncateToCells(input: string, width: number): string;
/** Counts the visible terminal cells occupied by the given string. */
export declare function visibleCellCount(input: string): number;
/** Truncates and right-pads a string to fit an exact terminal-cell width. */
export declare function padToWidth(content: string, width: number): string;
/** Normalizes arbitrary input down to a single renderable cell character. */
export declare function normalizeCellCharacter(input: string): string;
/** Returns the full render rectangle for a text object, including any border chrome. */
export declare function getTextRenderRect(object: TextObject): Rect;
/** Returns the cell where text content starts rendering inside its optional border. */
export declare function getTextContentOrigin(object: TextObject): Point;
/**
 * Returns the selection rectangle for a text object.
 *
 * Borderless text gets a padded virtual box so it can still be selected and dragged easily.
 */
export declare function getTextSelectionBounds(object: TextObject): Rect;
//# sourceMappingURL=text.d.ts.map