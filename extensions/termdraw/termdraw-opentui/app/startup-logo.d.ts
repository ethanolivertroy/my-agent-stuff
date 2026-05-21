/**
 * Startup-logo rendering helpers for the termDRAW app renderable.
 *
 * This file contains the splash art and the gradient logic that overlays it on the canvas
 * until the user begins interacting with the editor.
 */
import { type OptimizedBuffer } from "@opentui/core";
import type { DrawState } from "../draw-state.js";
import type { AppLayout, ChromeMode } from "./types.js";
/** Draws the startup logo overlay when it is enabled and still visible. */
export declare function renderStartupLogo(frameBuffer: OptimizedBuffer, state: DrawState, chromeMode: ChromeMode, layout: AppLayout | null, startupLogoEnabled: boolean, startupLogoDismissed: boolean): void;
//# sourceMappingURL=startup-logo.d.ts.map