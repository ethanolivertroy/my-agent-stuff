import type { HostCursor, HostFrame, HostLine } from "./types.js";
/** One changed row that the host should repaint. */
export interface HostLinePatch {
    row: number;
    line: HostLine;
}
/** Diff result for repainting one embedded OpenTUI surface efficiently. */
export interface HostFrameDiff {
    fullRepaint: boolean;
    width: number;
    height: number;
    linePatches: HostLinePatch[];
    cursor?: HostCursor;
    cursorChanged: boolean;
}
/** Compare two captured frames and return only the rows that need repainting. */
export declare function diffHostFrames(previous: HostFrame | null | undefined, next: HostFrame): HostFrameDiff;
