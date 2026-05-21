import { padToWidth, truncateToCells, visibleCellCount } from "./text.js";
import { BRUSHES, BOX_STYLES, DRAW_DOCUMENT_VERSION, INK_COLORS, LINE_STYLES, TEXT_BORDER_MODES, type BoxStyle, type CanvasInsets, type DrawDocument, type DrawMode, type ElbowOrientation, type InkColor, type LineStyle, type PointerEventLike, type TextBorderMode } from "./draw-state/types.js";
export { BRUSHES, BOX_STYLES, DRAW_DOCUMENT_VERSION, INK_COLORS, LINE_STYLES, TEXT_BORDER_MODES, padToWidth, truncateToCells, visibleCellCount, };
export type { BoxStyle, CanvasInsets, DrawDocument, DrawMode, DrawObject, InkColor, LineStyle, PointerEventLike, TextBorderMode, } from "./draw-state/types.js";
export declare function validateDrawDocument(value: unknown): DrawDocument;
export declare function parseDrawDocument(input: string): DrawDocument;
/**
 * Coordinates the editable termDRAW scene, tool state, selection state, and rendering caches.
 */
export declare class DrawState {
    private canvasInsets;
    private canvasWidth;
    private canvasHeight;
    private cursorX;
    private cursorY;
    private mode;
    private brush;
    private brushIndex;
    private boxStyle;
    private boxStyleIndex;
    private lineStyle;
    private lineStyleIndex;
    private elbowLineStyle;
    private elbowLineStyleIndex;
    private elbowOrientation;
    private textBorderMode;
    private textBorderModeIndex;
    private inkColor;
    private inkColorIndex;
    private objects;
    private selectedObjectIds;
    private selectedObjectId;
    private activeTextObjectId;
    private textEntryArmed;
    private pendingSelection;
    private pendingLine;
    private pendingBox;
    private pendingPaint;
    private dragState;
    private eraseState;
    private nextObjectNumber;
    private nextZIndex;
    private undoStack;
    private redoStack;
    private status;
    private sceneDirty;
    private renderCanvas;
    private renderCanvasColors;
    private renderConnections;
    private renderConnectionColors;
    /** Creates a new draw state sized to the provided viewport and canvas insets. */
    constructor(viewWidth: number, viewHeight: number, insets?: CanvasInsets);
    get currentMode(): DrawMode;
    get currentBrush(): string;
    get currentBoxStyle(): BoxStyle;
    get currentLineStyle(): LineStyle;
    get currentElbowOrientation(): ElbowOrientation;
    get currentTextBorderMode(): TextBorderMode;
    get currentInkColor(): InkColor;
    get currentStatus(): string;
    get currentCursorX(): number;
    get currentCursorY(): number;
    get width(): number;
    get height(): number;
    get canvasTopRow(): number;
    get canvasLeftCol(): number;
    get hasSelectedObject(): boolean;
    get isEditingText(): boolean;
    get isTextEntryArmed(): boolean;
    get hasActivePointerInteraction(): boolean;
    /** Recomputes the drawable canvas from the current viewport and inset configuration. */
    ensureCanvasSize(viewWidth: number, viewHeight: number, insets?: CanvasInsets): void;
    /** Routes pointer input into the active tool, drag interaction, or erase session. */
    handlePointerEvent(event: PointerEventLike): void;
    /** Returns the compact UI label for the active tool mode. */
    getModeLabel(): string;
    /** Returns the in-progress overlay characters for the current pointer interaction. */
    getActivePreviewCharacters(): Map<string, string>;
    /** Returns the rendered cell keys currently covered by the selection overlay. */
    getSelectedCellKeys(): Set<string>;
    /** Returns the dotted marquee preview for an in-progress selection drag. */
    getSelectionMarqueeCharacters(): Map<string, string>;
    /** Returns resize or endpoint handles for the current single-object selection. */
    getSelectionHandleCharacters(): Map<string, string>;
    /** Clears the current selection and active text edit state. */
    clearSelection(): boolean;
    /** Returns the final rendered character at a canvas cell. */
    getCompositeCell(x: number, y: number): string;
    /** Returns the final rendered color at a canvas cell. */
    getCompositeColor(x: number, y: number): InkColor | null;
    /** Moves the keyboard cursor while keeping it inside the canvas bounds. */
    moveCursor(dx: number, dy: number): void;
    /** Translates the selected object tree by the requested delta when possible. */
    moveSelectedObjectBy(dx: number, dy: number): void;
    /** Sets the active brush character used for paint strokes. */
    setBrush(char: string): void;
    /** Cycles through the predefined brush palette. */
    cycleBrush(direction: 1 | -1): void;
    /** Sets the active ink color and reapplies it to the current selection. */
    setInkColor(color: InkColor): void;
    /** Cycles through the available ink colors. */
    cycleInkColor(direction: 1 | -1): void;
    /** Sets the active box border style. */
    setBoxStyle(style: BoxStyle): void;
    /** Cycles through the available box border styles. */
    cycleBoxStyle(direction: 1 | -1): void;
    /** Sets the active line or elbow style. */
    setLineStyle(style: LineStyle): void;
    /** Cycles through the available line or elbow styles. */
    cycleLineStyle(direction: 1 | -1): void;
    /** Sets the active text border mode. */
    setTextBorderMode(mode: TextBorderMode): void;
    /** Cycles through the available text border modes. */
    cycleTextBorderMode(direction: 1 | -1): void;
    /** Advances to the next drawing mode in the standard tool order. */
    cycleMode(): void;
    /** Switches tools and clears transient interaction state that does not survive mode changes. */
    setMode(next: DrawMode): void;
    /** Toggles the route used by new elbow connectors. */
    toggleElbowOrientation(): void;
    /** Creates a one-cell paint or line object at the current cursor position. */
    stampBrushAtCursor(): void;
    /** Deletes the topmost object under the keyboard cursor. */
    eraseAtCursor(): void;
    /** Appends text into the active text object or starts a new one at the cursor. */
    insertCharacter(input: string): void;
    /** Deletes the last grapheme from the active text object or erases under the cursor. */
    backspace(): void;
    /** Deletes the current selection or the topmost object under the cursor. */
    deleteAtCursor(): void;
    /** Deletes the current selection and returns whether anything was removed. */
    deleteSelectedObject(): boolean;
    /** Removes every object from the scene. */
    clearCanvas(): void;
    /** Restores the previous snapshot when one exists. */
    undo(): void;
    /** Reapplies the next redo snapshot when one exists. */
    redo(): void;
    /** Exports the rendered canvas with surrounding empty rows trimmed away. */
    exportArt(): string;
    /** Exports the editable scene as a versioned termDRAW document. */
    exportDocument(): DrawDocument;
    /** Replaces the current editable scene from a validated termDRAW document. */
    loadDocument(document: DrawDocument): void;
    /** Replaces the footer status text with an explicit application message. */
    setStatusMessage(message: string): void;
    /** Attempts to start a resize, endpoint drag, or move interaction at the given cell. */
    private tryBeginObjectInteraction;
    /** Begins moving an object or selection rooted at the clicked object. */
    private beginMoveInteraction;
    /** Arms text entry at the requested canvas cell. */
    private placeTextCursor;
    /** Starts a right-drag erase session that only removes each object once. */
    private beginEraseSession;
    /** Updates the active transient pointer interaction to the latest pointer location. */
    private syncPointerInteraction;
    /** Commits or cancels the current transient pointer interaction. */
    private finishPointerInteraction;
    /** Applies the latest drag position to the active move, resize, or endpoint edit. */
    private updateDraggedObject;
    /** Keeps stored drag snapshots aligned with any z-index changes made during dragging. */
    private syncDragStateZ;
    /** Erases the topmost object at a cell during an active erase session. */
    private eraseObjectAt;
    /** Deletes the topmost object at a cell and reports whether anything changed. */
    private deleteTopmostObjectAt;
    /** Captures the undoable editor state needed to restore the scene later. */
    private createSnapshot;
    /** Pushes the current state onto the undo stack and clears redo history. */
    private pushUndo;
    /** Restores editor state from an undo or redo snapshot. */
    private restoreSnapshot;
    /** Rebuilds cached render buffers when scene content has changed. */
    private ensureScene;
    /** Writes a normalized character and color into the cached render canvas. */
    private paintRenderCell;
    /** Returns the composed box-drawing glyph for the connection grid at a cell. */
    private getConnectionGlyph;
    /** Builds the preview overlay for an in-progress line or elbow drag. */
    private getLinePreviewCharacters;
    /** Builds the preview overlay for an in-progress paint stroke. */
    private getPaintPreviewCharacters;
    /** Builds the preview overlay for an in-progress box drag. */
    private getBoxPreviewCharacters;
    /** Normalizes auto box styling into a concrete connection style. */
    private resolveBoxConnectionStyle;
    /** Returns whether a concrete box style should render as a manual dashed perimeter. */
    private isDashedBoxStyle;
    /** Alternates auto box weight based on nesting depth inside other boxes. */
    private getAutoBoxConnectionStyle;
    /** Looks up an object by id. */
    private getObjectById;
    /** Returns whether the given object id is currently selected. */
    private isObjectSelected;
    /** Returns the primary selected object when one exists. */
    private getSelectedObject;
    /** Returns the selected objects in stable selection order. */
    private getSelectedObjects;
    /** Returns selected objects that are not descendants of other selected objects. */
    private getSelectedRootObjects;
    /** Returns the full object trees rooted at the selected top-level objects. */
    private getSelectedObjectTrees;
    /** Returns the object tree that should move when the given object is dragged. */
    private getMoveSelectionForObject;
    /** Returns the text object currently being edited, if any. */
    private getActiveTextObject;
    /** Returns the object identified by `id` plus all of its descendants. */
    private getObjectTree;
    /** Reassigns parent boxes so each object belongs to the smallest containing box. */
    private recomputeParentAssignments;
    /** Replaces the scene object list and refreshes dependent selection and render state. */
    private setObjects;
    /** Replaces a single object in the scene by id. */
    private replaceObject;
    /** Replaces multiple objects in the scene by id. */
    private replaceObjects;
    /** Removes a single object from the scene. */
    private removeObjectById;
    /** Updates multi-selection state while preserving a valid primary selection. */
    private setSelectedObjects;
    /** Drops dangling selection references after scene changes. */
    private syncSelection;
    /** Finds the topmost resize or endpoint handle at a canvas cell. */
    private findTopmostHandleAt;
    /** Finds the topmost object occupying a canvas cell. */
    private findTopmostObjectAt;
    /** Finds the topmost object hit and whether the click landed on text content. */
    private findTopmostObjectHitAt;
    /** Returns every object whose selection bounds intersect the marquee. */
    private getObjectsWithinSelectionRect;
    /** Translates an object while clamping it inside the canvas bounds. */
    private translateObjectWithinCanvas;
    /** Translates an object tree while clamping the entire group inside the canvas. */
    private translateObjectTreeWithinCanvas;
    /** Resizes a box from one handle while keeping it inside the canvas. */
    private resizeBoxWithinCanvas;
    /** Resizes a box and remaps its descendants into the resized content area. */
    private resizeObjectTreeWithinCanvas;
    /** Remaps a child object from one parent-content rectangle into another. */
    private transformObjectForResizedParent;
    /** Maps a point proportionally from one rectangle into another. */
    private mapPointBetweenRects;
    /** Maps a scalar value proportionally between two inclusive ranges. */
    private mapAxisBetweenRanges;
    /** Keeps a text object fully inside a target rectangle after remapping. */
    private clampTextIntoRect;
    /** Moves one endpoint of a line while honoring canvas bounds and axis constraints. */
    private adjustLineEndpointWithinCanvas;
    /** Returns the fixed anchor corner opposite the dragged resize handle. */
    private getOppositeBoxCorner;
    /** Clamps a point into the current canvas bounds. */
    private clampPointInsideCanvas;
    /** Adjusts a resized box point so the box never collapses to a single cell. */
    private ensureBoxDoesNotCollapse;
    /** Shifts an object just enough to bring it fully back inside the canvas. */
    private shiftObjectInsideCanvas;
    private bringObjectToFront;
    /** Brings a group of objects to the front while preserving their relative stacking order. */
    private bringObjectsToFront;
    /** Allocates the next stable object id. */
    private createObjectId;
    /** Allocates the next topmost z-index. */
    private allocateZIndex;
    /** Derives the next stable `obj-N` identifier after loading a document. */
    private getNextDocumentObjectNumber;
    /** Derives the next z-index after loading a document. */
    private getNextDocumentZIndex;
    /** Formats rectangle bounds for user-facing status text. */
    private describeRect;
    /** Converts the elbow modifier key into a route orientation. */
    private getElbowOrientationFromModifier;
    /** Formats an elbow route orientation for user-facing status text. */
    private describeElbowOrientation;
    /** Formats a line style label for user-facing status text. */
    private describeLineStyle;
    /** Formats a box style label for user-facing status text. */
    private describeBoxStyle;
    /** Formats a text border label for user-facing status text. */
    private describeTextBorderMode;
    /** Formats an ink color label for user-facing status text. */
    private describeInkColor;
    /** Formats an object description for user-facing status text. */
    private describeObject;
    /** Returns whether two objects have equivalent editable state. */
    private objectsEqual;
    /** Returns whether two object lists are equal by id and editable state. */
    private objectListsEqual;
    /** Returns whether a canvas coordinate is inside the drawable area. */
    private isInsideCanvas;
    /** Marks cached render buffers as stale. */
    private markSceneDirty;
    /** Updates the user-facing status message. */
    private setStatus;
}
//# sourceMappingURL=draw-state.d.ts.map