import { isAbsolute, resolve } from "node:path";
import { pathToFileURL } from "node:url";
function resolveIslandModule(module) {
    if (module instanceof URL) {
        return module.href;
    }
    if (module.startsWith("file:")) {
        return module;
    }
    if (isAbsolute(module) || module.startsWith(".")) {
        return pathToFileURL(resolve(module)).href;
    }
    return module;
}
/** Normalize path-like island descriptors before sending them to the sidecar. */
export function resolveOpenTuiIslandSource(source) {
    return {
        module: resolveIslandModule(source.module),
        exportName: source.exportName ?? "default",
        props: source.props,
    };
}
export const resolveIslandSource = resolveOpenTuiIslandSource;
