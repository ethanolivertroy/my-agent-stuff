import React from "react";
import { TermDrawAppRenderable, TermDrawEditorRenderable, type TermDrawAppRenderableOptions, type TermDrawEditorRenderableOptions } from "./app.js";
export declare const TERM_DRAW_COMPONENT_NAME = "term-draw";
export declare const TERM_DRAW_APP_COMPONENT_NAME = "term-draw-app";
export declare const TERM_DRAW_EDITOR_COMPONENT_NAME = "term-draw-editor";
export declare function registerTermDrawComponent(): void;
export declare const registerTermDrawComponents: typeof registerTermDrawComponent;
declare module "@opentui/react" {
    interface OpenTUIComponents {
        "term-draw": typeof TermDrawAppRenderable;
        "term-draw-app": typeof TermDrawAppRenderable;
        "term-draw-editor": typeof TermDrawEditorRenderable;
    }
}
export type TermDrawProps = TermDrawAppRenderableOptions;
export type TermDrawAppProps = TermDrawAppRenderableOptions;
export type TermDrawEditorProps = TermDrawEditorRenderableOptions;
export declare function TermDraw(props: TermDrawProps): React.ReactElement;
export declare function TermDrawApp(props: TermDrawAppProps): React.ReactElement;
export declare function TermDrawEditor(props: TermDrawEditorProps): React.ReactElement;
//# sourceMappingURL=react.d.ts.map