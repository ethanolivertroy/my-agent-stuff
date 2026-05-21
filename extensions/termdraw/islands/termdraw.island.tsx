/** @jsxImportSource @opentui/react */

import { useEffect } from "react";
import { useIslandBridge } from "opentui-island";
import { TermDrawApp } from "@termdraw/opentui";

type PiTermDrawIslandProps = {
  showStartupLogo?: boolean;
  footerText?: string;
  readyEventType?: string;
};

export default function PiTermDrawIsland({
  showStartupLogo = false,
  footerText,
  readyEventType = "ready",
}: PiTermDrawIslandProps) {
  const bridge = useIslandBridge();

  useEffect(() => {
    bridge.emit({
      type: readyEventType,
      payload: { ready: true },
    });
  }, [bridge, readyEventType]);

  return (
    <TermDrawApp
      width="100%"
      height="100%"
      autoFocus
      showStartupLogo={showStartupLogo}
      cancelOnCtrlC={false}
      footerText={footerText}
      onSave={(art) => {
        bridge.emit({
          type: "save",
          payload: { art },
        });
      }}
      onCancel={() => {
        bridge.emit({
          type: "cancel",
          payload: { reason: "user" },
        });
      }}
    />
  );
}
