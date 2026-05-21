import type { HostMouseInput } from "./types.js";
export declare const ENABLE_SGR_MOUSE_MODE = "\u001B[?1000h\u001B[?1002h\u001B[?1006h";
export declare const DISABLE_SGR_MOUSE_MODE = "\u001B[?1000l\u001B[?1002l\u001B[?1006l";
export type ParsedTerminalMouseInput = HostMouseInput & {
    x: number;
    y: number;
};
export interface ParsedTerminalMouseStream {
    events: ParsedTerminalMouseInput[];
    rest: string;
}
/** Parse one SGR mouse sequence into a zero-based host mouse event. */
export declare function parseSgrMouseInput(data: string): ParsedTerminalMouseInput | undefined;
/** Consume all complete SGR mouse sequences from a buffered terminal input stream. */
export declare function parseSgrMouseStream(buffer: string): ParsedTerminalMouseStream;
