/** @jsxImportSource @opentui/react */

import { useIslandBridge, useOpenTuiIslandBridge } from "opentui-island";
import { useEffect } from "react";

type CompatAliasesIslandProps = {
  mode?: "canonical" | "legacy";
};

export default function CompatAliasesIsland({ mode = "canonical" }: CompatAliasesIslandProps) {
  const canonicalBridge = useIslandBridge();
  const legacyBridge = useOpenTuiIslandBridge();

  useEffect(() => {
    const bridge = mode === "legacy" ? legacyBridge : canonicalBridge;
    bridge.emit({
      type: mode === "legacy" ? "legacy-bridge-ready" : "canonical-bridge-ready",
      payload: { mode },
    });
  }, [canonicalBridge, legacyBridge, mode]);

  return (
    <box style={{ width: "100%", height: "100%" }}>
      <text>{`compat:${mode}`}</text>
    </box>
  );
}
