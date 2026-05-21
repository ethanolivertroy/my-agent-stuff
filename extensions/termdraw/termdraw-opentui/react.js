import React from "react";
import { extend } from "@opentui/react";
import { TermDrawAppRenderable, TermDrawEditorRenderable, } from "./app.js";
export const TERM_DRAW_COMPONENT_NAME = "term-draw";
export const TERM_DRAW_APP_COMPONENT_NAME = "term-draw-app";
export const TERM_DRAW_EDITOR_COMPONENT_NAME = "term-draw-editor";
let registered = false;
export function registerTermDrawComponent() {
    if (registered)
        return;
    extend({
        [TERM_DRAW_COMPONENT_NAME]: TermDrawAppRenderable,
        [TERM_DRAW_APP_COMPONENT_NAME]: TermDrawAppRenderable,
        [TERM_DRAW_EDITOR_COMPONENT_NAME]: TermDrawEditorRenderable,
    });
    registered = true;
}
export const registerTermDrawComponents = registerTermDrawComponent;
export function TermDraw(props) {
    registerTermDrawComponent();
    return React.createElement(TERM_DRAW_COMPONENT_NAME, props);
}
export function TermDrawApp(props) {
    registerTermDrawComponent();
    return React.createElement(TERM_DRAW_APP_COMPONENT_NAME, props);
}
export function TermDrawEditor(props) {
    registerTermDrawComponent();
    return React.createElement(TERM_DRAW_EDITOR_COMPONENT_NAME, props);
}
