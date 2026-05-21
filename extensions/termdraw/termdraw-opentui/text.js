const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
/** Splits text into terminal cells using grapheme segmentation rather than UTF-16 code units. */
export function splitGraphemes(input) {
    return Array.from(graphemeSegmenter.segment(input), (segment) => segment.segment);
}
/** Truncates text to a maximum number of terminal cells. */
export function truncateToCells(input, width) {
    if (width <= 0)
        return "";
    return splitGraphemes(input).slice(0, width).join("");
}
/** Counts the visible terminal cells occupied by the given string. */
export function visibleCellCount(input) {
    return splitGraphemes(input).length;
}
/** Truncates and right-pads a string to fit an exact terminal-cell width. */
export function padToWidth(content, width) {
    const clipped = truncateToCells(content, width);
    return clipped + " ".repeat(Math.max(0, width - visibleCellCount(clipped)));
}
/** Normalizes arbitrary input down to a single renderable cell character. */
export function normalizeCellCharacter(input) {
    const first = splitGraphemes(input)[0] ?? " ";
    return first.length > 0 ? first : " ";
}
/** Returns the full render rectangle for a text object, including any border chrome. */
export function getTextRenderRect(object) {
    const contentWidth = Math.max(1, visibleCellCount(object.content));
    if (object.border === "none") {
        return {
            left: object.x,
            top: object.y,
            right: object.x + contentWidth - 1,
            bottom: object.y,
        };
    }
    return {
        left: object.x,
        top: object.y,
        right: object.x + contentWidth + 1,
        bottom: object.y + 2,
    };
}
/** Returns the cell where text content starts rendering inside its optional border. */
export function getTextContentOrigin(object) {
    return object.border === "none"
        ? { x: object.x, y: object.y }
        : { x: object.x + 1, y: object.y + 1 };
}
/**
 * Returns the selection rectangle for a text object.
 *
 * Borderless text gets a padded virtual box so it can still be selected and dragged easily.
 */
export function getTextSelectionBounds(object) {
    const rect = getTextRenderRect(object);
    return object.border === "none"
        ? {
            left: rect.left - 1,
            top: rect.top - 1,
            right: rect.right + 1,
            bottom: rect.bottom + 1,
        }
        : rect;
}
