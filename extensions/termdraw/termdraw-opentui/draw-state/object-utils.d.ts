import type { BoxObject, BoxResizeHandle, DrawObject, ElbowObject, LineEndpointHandle, LineObject, Point, Rect } from "./types.js";
/** Returns a structural clone of a draw object. */
export declare function cloneObject(object: DrawObject): DrawObject;
/** Returns structural clones for an object list. */
export declare function cloneObjects(objects: DrawObject[]): DrawObject[];
/** Returns the inclusive bounds occupied by an object's content. */
export declare function getObjectBounds(object: DrawObject): Rect;
/** Returns the inner content bounds of a box, excluding its border stroke. */
export declare function getBoxContentBounds(box: BoxObject): Rect;
/** Returns the union bounds for a set of objects, or `null` when empty. */
export declare function getBoundsUnion(objects: DrawObject[]): Rect | null;
/** Returns the bounds used when selecting an object. */
export declare function getObjectSelectionBounds(object: DrawObject): Rect;
/** Returns the resize-handle locations for a box. */
export declare function getBoxCornerPoints(box: BoxObject): Record<BoxResizeHandle, Point>;
/** Returns the editable endpoint-handle locations for a line. */
export declare function getLineEndpointPoints(line: LineObject | ElbowObject): Record<LineEndpointHandle, Point>;
/** Returns every rendered cell occupied by an object. */
export declare function getObjectRenderCells(object: DrawObject): Point[];
/** Returns a translated copy of an object. */
export declare function translateObject(object: DrawObject, dx: number, dy: number): DrawObject;
/** Returns whether an object currently occupies the provided canvas cell. */
export declare function objectContainsPoint(object: DrawObject, x: number, y: number): boolean;
//# sourceMappingURL=object-utils.d.ts.map