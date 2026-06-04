import { execFileSync } from "node:child_process";
import { StringEnum, Type } from "@mariozechner/pi-ai";
import type { ExtensionAPI, ExtensionCommandContext } from "@mariozechner/pi-coding-agent";
import { marked } from "marked";

const FORMAT_VALUES = ["markdown", "html", "text"] as const;
const TARGET_VALUES = ["none", "linkedin-article", "linkedin-post", "x"] as const;

type ClipboardFormat = (typeof FORMAT_VALUES)[number];
type ClipboardTarget = (typeof TARGET_VALUES)[number];

const clipboardParams = Type.Object({
  content: Type.String({ description: "The content to place on the clipboard." }),
  format: Type.Optional(StringEnum(FORMAT_VALUES, { description: "How to interpret content before copying." })),
  target: Type.Optional(StringEnum(TARGET_VALUES, { description: "Optional destination to open after copying." })),
  openUrl: Type.Optional(Type.String({ description: "Open this exact URL after copying. Overrides target." })),
});

function tokenizeArgs(input: string): string[] {
  return input.match(/"[^"]*"|'[^']*'|\S+/g)?.map((token) => token.replace(/^['"]|['"]$/g, "")) ?? [];
}

function parseCommandArgs(input: string): {
  format: ClipboardFormat;
  target: ClipboardTarget;
  openUrl?: string;
  content?: string;
} {
  const tokens = tokenizeArgs(input);
  let format: ClipboardFormat = "markdown";
  let target: ClipboardTarget = "none";
  let openUrl: string | undefined;
  const contentTokens: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!;
    if (token === "--format" && tokens[i + 1]) {
      const next = tokens[++i]!;
      if (FORMAT_VALUES.includes(next as ClipboardFormat)) format = next as ClipboardFormat;
      else contentTokens.push(token, next);
      continue;
    }
    if (token.startsWith("--format=")) {
      const value = token.slice("--format=".length);
      if (FORMAT_VALUES.includes(value as ClipboardFormat)) format = value as ClipboardFormat;
      else contentTokens.push(token);
      continue;
    }
    if (token === "--target" && tokens[i + 1]) {
      const next = tokens[++i]!;
      if (TARGET_VALUES.includes(next as ClipboardTarget)) target = next as ClipboardTarget;
      else contentTokens.push(token, next);
      continue;
    }
    if (token.startsWith("--target=")) {
      const value = token.slice("--target=".length);
      if (TARGET_VALUES.includes(value as ClipboardTarget)) target = value as ClipboardTarget;
      else contentTokens.push(token);
      continue;
    }
    if (token === "--open" && tokens[i + 1]) {
      openUrl = tokens[++i]!;
      continue;
    }
    if (token.startsWith("--open=")) {
      openUrl = token.slice("--open=".length);
      continue;
    }
    contentTokens.push(token);
  }

  return {
    format,
    target,
    openUrl,
    content: contentTokens.join(" ").trim() || undefined,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function wrapHtmlDocument(body: string): string {
  return `<!doctype html><html><body>${body}</body></html>`;
}

function textToHtml(text: string): string {
  const paragraphs = text
    .trim()
    .split(/\n\s*\n/g)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
  return wrapHtmlDocument(paragraphs || `<p>${escapeHtml(text)}</p>`);
}

async function contentToHtml(content: string, format: ClipboardFormat): Promise<string> {
  if (format === "html") {
    const trimmed = content.trim();
    return /^<!doctype html>|^<html[\s>]/i.test(trimmed) ? trimmed : wrapHtmlDocument(trimmed);
  }
  if (format === "text") {
    return textToHtml(content);
  }
  const rendered = await marked.parse(content, { gfm: true, breaks: false });
  return wrapHtmlDocument(rendered);
}

function targetToUrl(target: ClipboardTarget): string | undefined {
  switch (target) {
    case "linkedin-article":
      return "https://www.linkedin.com/article/new/";
    case "linkedin-post":
      return "https://www.linkedin.com/feed/";
    case "x":
      return "https://x.com/compose/post";
    case "none":
    default:
      return undefined;
  }
}

function copyPlainTextToClipboard(text: string): void {
  if (process.platform === "darwin") {
    execFileSync("pbcopy", { input: text });
    return;
  }
  if (process.platform === "win32") {
    execFileSync("clip", { input: text, shell: true });
    return;
  }
  execFileSync("xclip", ["-selection", "clipboard"], { input: text });
}

function copyHtmlToClipboard(html: string): void {
  if (process.platform !== "darwin") {
    throw new Error("Rich HTML clipboard is currently implemented for macOS only.");
  }
  const hex = Buffer.from(html, "utf8").toString("hex");
  execFileSync("osascript", ["-e", `set the clipboard to «data HTML${hex}»`]);
}

function openUrl(url: string): void {
  if (process.platform === "darwin") {
    execFileSync("open", [url]);
    return;
  }
  if (process.platform === "win32") {
    execFileSync("cmd", ["/c", "start", "", url]);
    return;
  }
  execFileSync("xdg-open", [url]);
}

async function resolveContent(ctx: ExtensionCommandContext, provided?: string): Promise<string | undefined> {
  if (provided?.trim()) return provided.trim();
  const editorText = ctx.ui.getEditorText().trim();
  if (editorText) return editorText;
  return (await ctx.ui.editor("Content to copy", ""))?.trim();
}

async function runClipboardAction(
  content: string,
  format: ClipboardFormat,
  target: ClipboardTarget,
  openUrlOverride?: string,
): Promise<{ html: string; openedUrl?: string }> {
  if (!content.trim()) {
    throw new Error("Nothing to copy.");
  }

  if (format === "text") {
    copyPlainTextToClipboard(content);
  } else {
    const html = await contentToHtml(content, format);
    copyHtmlToClipboard(html);
  }

  const openedUrl = openUrlOverride?.trim() || targetToUrl(target);
  if (openedUrl) openUrl(openedUrl);

  return {
    html: format === "text" ? textToHtml(content) : await contentToHtml(content, format),
    openedUrl,
  };
}

function describeAction(format: ClipboardFormat, openedUrl?: string): string {
  const copied = format === "text" ? "Copied plain text to clipboard." : `Copied ${format} as rich HTML to clipboard.`;
  return openedUrl ? `${copied} Opened ${openedUrl}` : copied;
}

export default function richClipboardExtension(pi: ExtensionAPI) {
  pi.registerTool({
    name: "copy_rich_clipboard",
    label: "Copy Rich Clipboard",
    description: "Copy markdown, HTML, or text to the clipboard. Can stage rich HTML for paste targets like LinkedIn and optionally open a destination URL.",
    promptSnippet: "Copy drafted content to the system clipboard as rich HTML or plain text, optionally opening a destination like LinkedIn or X.",
    promptGuidelines: [
      "Use this when the user asks to copy drafted content to the clipboard.",
      "Prefer format=markdown for rich-text paste targets like LinkedIn and format=text for plain-text targets like X.",
    ],
    parameters: clipboardParams,
    async execute(_toolCallId, params) {
      const format = params.format ?? "markdown";
      const target = params.target ?? "none";
      const result = await runClipboardAction(params.content, format, target, params.openUrl);
      return {
        content: [{ type: "text", text: describeAction(format, result.openedUrl) }],
        details: {
          format,
          target,
          openUrl: result.openedUrl ?? null,
          characters: params.content.length,
        },
      };
    },
  });

  pi.registerCommand("copy-rich", {
    description: "Copy text, markdown, or HTML to the clipboard as rich content. Uses editor text if no content is provided.",
    handler: async (args, ctx) => {
      const parsed = parseCommandArgs(args.trim());
      const content = await resolveContent(ctx, parsed.content);
      if (!content) {
        ctx.ui.notify("Clipboard copy cancelled.", "info");
        return;
      }

      ctx.ui.setStatus("rich-clipboard", "Copying rich clipboard content...");
      try {
        const result = await runClipboardAction(content, parsed.format, parsed.target, parsed.openUrl);
        ctx.ui.notify(describeAction(parsed.format, result.openedUrl), "info");
      } catch (error) {
        ctx.ui.notify(error instanceof Error ? error.message : String(error), "error");
      } finally {
        ctx.ui.setStatus("rich-clipboard", undefined);
      }
    },
  });

  pi.registerCommand("copy-linkedin", {
    description: "Copy markdown to the clipboard as rich HTML and open the LinkedIn article composer.",
    handler: async (args, ctx) => {
      const content = await resolveContent(ctx, args.trim() || undefined);
      if (!content) {
        ctx.ui.notify("Clipboard copy cancelled.", "info");
        return;
      }

      ctx.ui.setStatus("rich-clipboard", "Preparing LinkedIn clipboard...");
      try {
        const result = await runClipboardAction(content, "markdown", "linkedin-article");
        ctx.ui.notify(describeAction("markdown", result.openedUrl), "info");
      } catch (error) {
        ctx.ui.notify(error instanceof Error ? error.message : String(error), "error");
      } finally {
        ctx.ui.setStatus("rich-clipboard", undefined);
      }
    },
  });

  pi.registerCommand("copy-x", {
    description: "Copy plain text to the clipboard and open the X compose screen.",
    handler: async (args, ctx) => {
      const content = await resolveContent(ctx, args.trim() || undefined);
      if (!content) {
        ctx.ui.notify("Clipboard copy cancelled.", "info");
        return;
      }

      ctx.ui.setStatus("rich-clipboard", "Preparing X clipboard...");
      try {
        const result = await runClipboardAction(content, "text", "x");
        ctx.ui.notify(describeAction("text", result.openedUrl), "info");
      } catch (error) {
        ctx.ui.notify(error instanceof Error ? error.message : String(error), "error");
      } finally {
        ctx.ui.setStatus("rich-clipboard", undefined);
      }
    },
  });
}
