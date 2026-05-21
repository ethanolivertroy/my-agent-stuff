import type { HostFrame, HostLine, HostSpan } from "./types.js";
/** Render one captured host span as ANSI text. */
export declare function hostSpanToAnsi(span: HostSpan): string;
/** Render one captured host line as a single ANSI string. */
export declare function hostLineToAnsi(line: HostLine): string;
/** Render a captured host frame into ANSI rows for foreign TUI toolkits. */
export declare function hostFrameToAnsiLines(frame: HostFrame): string[];
