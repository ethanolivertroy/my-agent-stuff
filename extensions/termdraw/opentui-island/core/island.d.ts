export type OpenTuiIslandValue = null | boolean | number | string | OpenTuiIslandValue[] | {
    [key: string]: OpenTuiIslandValue;
};
/** Serializable props passed into a sidecar-loaded island component. */
export interface OpenTuiIslandProps {
    [key: string]: OpenTuiIslandValue;
}
/** Public description of one OpenTUI island module that Bun can import. */
export interface OpenTuiIslandSource {
    module: string | URL;
    exportName?: string;
    props?: OpenTuiIslandProps;
}
/** Fully resolved island descriptor sent over the sidecar protocol. */
export interface ResolvedOpenTuiIslandSource {
    module: string;
    exportName: string;
    props?: OpenTuiIslandProps;
}
/** Normalize path-like island descriptors before sending them to the sidecar. */
export declare function resolveOpenTuiIslandSource(source: OpenTuiIslandSource): ResolvedOpenTuiIslandSource;
export type IslandValue = OpenTuiIslandValue;
export type IslandProps = OpenTuiIslandProps;
export type IslandSource = OpenTuiIslandSource;
export type ResolvedIslandSource = ResolvedOpenTuiIslandSource;
export declare const resolveIslandSource: typeof resolveOpenTuiIslandSource;
