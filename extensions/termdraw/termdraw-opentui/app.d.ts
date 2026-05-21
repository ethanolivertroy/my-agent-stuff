/**
 * Public entry point for the termDRAW renderables.
 *
 * This file keeps the exported renderable classes and user-facing helpers in one place while
 * delegating layout, rendering, startup-logo, and input details to smaller internal modules in
 * `src/app/`.
 */
import { FrameBufferRenderable, type KeyEvent, type MouseEvent, type OptimizedBuffer, type RenderContext, type RenderableOptions } from "@opentui/core";
import { type DrawDocument } from "./draw-state.js";
import type { ChromeMode } from "./app/types.js";
/** Configures the shared termDRAW frame-buffer renderable. */
export interface TermDrawRenderableOptions extends RenderableOptions<FrameBufferRenderable> {
    width?: number | "auto" | `${number}%`;
    height?: number | "auto" | `${number}%`;
    respectAlpha?: boolean;
    onSave?: (art: string) => void;
    onSaveDiagram?: (document: DrawDocument, path: string) => void | Promise<void>;
    onCancel?: () => void;
    initialDocument?: DrawDocument;
    diagramPath?: string;
    autoFocus?: boolean;
    showStartupLogo?: boolean;
    cancelOnCtrlC?: boolean;
    footerText?: string;
    chromeMode?: ChromeMode;
}
/**
 * Coordinates the retained draw state with frame-buffer rendering and input handling.
 *
 * The class owns lifecycle, callbacks, and canvas sizing while delegating chrome layout,
 * rendering, and key/mouse dispatch to smaller helper modules.
 */
export declare class TermDrawRenderable extends FrameBufferRenderable {
    private readonly state;
    private readonly chromeMode;
    private onSaveCallback;
    private onSaveDiagramCallback;
    private onCancelCallback;
    private pendingInitialDocument;
    private diagramPath;
    private readonly diagramSaveState;
    private autoFocusEnabled;
    private startupLogoEnabled;
    private startupLogoDismissed;
    private cancelOnCtrlCEnabled;
    private footerTextOverride;
    /** Creates a new termDRAW renderable using either the full chrome or editor-only mode. */
    constructor(ctx: RenderContext, options?: TermDrawRenderableOptions);
    /** Sets the callback invoked when the user saves the current drawing. */
    set onSave(handler: ((art: string) => void) | undefined);
    /** Sets the callback invoked when the user cancels out of the editor. */
    set onCancel(handler: (() => void) | undefined);
    /** Sets the callback invoked when the user saves the editable diagram document. */
    set onSaveDiagram(handler: ((document: DrawDocument, path: string) => void | Promise<void>) | undefined);
    /** Enables or disables automatic focus after construction. */
    set autoFocus(value: boolean | undefined);
    /** Controls whether the startup logo overlay can be shown. */
    set showStartupLogo(value: boolean | undefined);
    /** Controls whether Ctrl+C cancels the editor in addition to Ctrl+Q. */
    set cancelOnCtrlC(value: boolean | undefined);
    /** Overrides the footer help text shown in the full-chrome renderable. */
    set footerText(value: string | undefined);
    /** Exports the current drawing as plain text art. */
    exportArt(): string;
    /** Exports the current drawing as a versioned editable document. */
    exportDocument(): DrawDocument;
    /** Resizes the retained canvas whenever the outer renderable changes size. */
    protected onResize(width: number, height: number): void;
    /** Dispatches mouse interaction to chrome hit targets or the draw-state pointer handler. */
    protected onMouseEvent(event: MouseEvent): void;
    /** Draws either the full app chrome or the editor-only surface into the frame buffer. */
    protected renderSelf(buffer: OptimizedBuffer): void;
    /** Dispatches keyboard shortcuts, cursor movement, and text entry. */
    handleKeyPress(key: KeyEvent): boolean;
    /** Hides the startup logo permanently after the first meaningful interaction. */
    private dismissStartupLogo;
    /** Returns the active save prompt state when the save dialog is visible. */
    private getDiagramSavePrompt;
    /** Recomputes the canvas size and returns the full-chrome layout when applicable. */
    private syncCanvasLayout;
    /** Applies any deferred initial document once the renderable has a usable canvas size. */
    private loadPendingInitialDocumentIfNeeded;
    /** Starts a diagram save, prompting for a path when no diagram path is known yet. */
    private beginDiagramSave;
    /** Applies the result of the extracted save-prompt key handler to the renderable state. */
    private applyDiagramSavePromptKeyResult;
    /** Persists the editable document and updates the active diagram path on success. */
    private saveDiagramToPath;
}
/** Options for the full-chrome standalone app renderable. */
export type TermDrawAppRenderableOptions = Omit<TermDrawRenderableOptions, "chromeMode">;
/** Options for the editor-only renderable. */
export type TermDrawEditorRenderableOptions = Omit<TermDrawRenderableOptions, "chromeMode">;
/** Full-chrome renderable wrapper used by the standalone app shell. */
export declare class TermDrawAppRenderable extends TermDrawRenderable {
    /** Creates a full-chrome termDRAW renderable. */
    constructor(ctx: RenderContext, options?: TermDrawAppRenderableOptions);
}
/** Editor-only renderable wrapper used by embedded integrations. */
export declare class TermDrawEditorRenderable extends TermDrawRenderable {
    /** Creates an editor-only termDRAW renderable. */
    constructor(ctx: RenderContext, options?: TermDrawEditorRenderableOptions);
}
/** Formats saved artwork as either plain text or a fenced markdown block. */
export declare function formatSavedOutput(art: string, fenced: boolean): string;
/** Builds the CLI help text shown by the standalone termDRAW app. */
export declare function buildHelpText(binaryName?: string): string;
//# sourceMappingURL=app.d.ts.map