import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function mmCommand(pi: ExtensionAPI) {
  pi.registerCommand("mm", {
    description: "Run mischief-managed to save a session note",
    handler: async (args, ctx) => {
      const suffix = args.trim() ? ` ${args.trim()}` : "";
      ctx.ui.notify("Running mischief-managed...", "info");
      pi.sendUserMessage(`/skill:mischief-managed${suffix}`);
    },
  });
}
