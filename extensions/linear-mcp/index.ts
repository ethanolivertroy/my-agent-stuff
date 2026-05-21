import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const EXTENSION_VERSION = "0.1.0";
const DEFAULT_ENDPOINT = "https://mcp.linear.app/mcp";
const STATUS_KEY = "linear-mcp";
const MAX_TEXT_BYTES = 50 * 1024;
const MAX_TEXT_LINES = 2_000;

type JsonObject = Record<string, unknown>;

type McpTool = {
	name: string;
	title?: string;
	description?: string;
	inputSchema: JsonObject & { type: "object" };
	outputSchema?: JsonObject;
	annotations?: {
		title?: string;
		readOnlyHint?: boolean;
		destructiveHint?: boolean;
		idempotentHint?: boolean;
		openWorldHint?: boolean;
	};
	_meta?: JsonObject;
};

type Connection = {
	client: Client;
};

type RegisteredTool = {
	piName: string;
	upstreamName: string;
	mcpTool: McpTool;
};

type LinearMcpDetails = {
	upstreamTool: string;
	piTool: string;
	endpoint: string;
	contentTypes: string[];
	structuredContent?: unknown;
	meta?: unknown;
	truncated?: boolean;
};

function getEndpoint(): string {
	return process.env.LINEAR_MCP_ENDPOINT?.trim() || DEFAULT_ENDPOINT;
}

function getToken(): string | undefined {
	return process.env.LINEAR_MCP_TOKEN?.trim() || process.env.LINEAR_ACCESS_TOKEN?.trim() || process.env.LINEAR_API_KEY?.trim();
}

function getTimeoutMs(): number {
	const raw = process.env.LINEAR_MCP_TIMEOUT_MS?.trim();
	const parsed = raw ? Number(raw) : NaN;
	return Number.isFinite(parsed) && parsed > 0 ? parsed : 120_000;
}

function getToolPrefix(): string {
	return process.env.LINEAR_MCP_TOOL_PREFIX?.trim() || "";
}

function shouldConfirmMutations(): boolean {
	return ["1", "true", "yes", "on"].includes((process.env.LINEAR_MCP_CONFIRM_MUTATIONS || "").toLowerCase());
}

function assertConfigured(): string {
	const token = getToken();
	if (!token) {
		throw new Error(
			"Linear MCP is not configured. Set LINEAR_API_KEY, LINEAR_ACCESS_TOKEN, or LINEAR_MCP_TOKEN, then /reload or run /linear-refresh-tools.",
		);
	}
	return token;
}

function normalizeToolName(name: string): string {
	const prefixed = `${getToolPrefix()}${name}`;
	return prefixed.replace(/[^A-Za-z0-9_]/g, "_");
}

function humanizeToolName(name: string): string {
	return name
		.split(/[_-]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function normalizeInputSchema(schema: unknown): JsonObject & { type: "object" } {
	if (schema && typeof schema === "object" && !Array.isArray(schema) && (schema as JsonObject).type === "object") {
		return schema as JsonObject & { type: "object" };
	}
	return { type: "object", properties: {}, additionalProperties: true };
}

function asArguments(params: unknown): JsonObject {
	if (params && typeof params === "object" && !Array.isArray(params)) {
		return params as JsonObject;
	}
	return {};
}

function truncateText(input: string): { text: string; truncated: boolean } {
	const lines = input.split(/\r?\n/);
	let text = lines.slice(0, MAX_TEXT_LINES).join("\n");
	let truncated = lines.length > MAX_TEXT_LINES;

	const encoder = new TextEncoder();
	if (encoder.encode(text).length > MAX_TEXT_BYTES) {
		let lo = 0;
		let hi = text.length;
		while (lo < hi) {
			const mid = Math.floor((lo + hi + 1) / 2);
			if (encoder.encode(text.slice(0, mid)).length <= MAX_TEXT_BYTES) lo = mid;
			else hi = mid - 1;
		}
		text = text.slice(0, lo);
		truncated = true;
	}

	if (truncated) {
		text += `\n\n[Linear MCP output truncated to ${MAX_TEXT_LINES} lines / ${MAX_TEXT_BYTES} bytes.]`;
	}
	return { text, truncated };
}

function stringifyUnknown(value: unknown): string {
	if (typeof value === "string") return value;
	try {
		return JSON.stringify(value, null, 2);
	} catch {
		return String(value);
	}
}

function convertMcpContent(result: JsonObject): {
	content: Array<{ type: "text"; text: string } | { type: "image"; data: string; mimeType: string }>;
	contentTypes: string[];
	truncated: boolean;
	textForError: string;
} {
	const rawContent = Array.isArray(result.content) ? result.content : [];
	const content: Array<{ type: "text"; text: string } | { type: "image"; data: string; mimeType: string }> = [];
	const textParts: string[] = [];
	const contentTypes: string[] = [];
	let truncated = false;

	const pushText = (text: string) => {
		const next = truncateText(text);
		truncated ||= next.truncated;
		content.push({ type: "text", text: next.text });
		textParts.push(next.text);
	};

	for (const item of rawContent) {
		if (!item || typeof item !== "object") {
			contentTypes.push(typeof item);
			pushText(stringifyUnknown(item));
			continue;
		}

		const block = item as JsonObject;
		const type = typeof block.type === "string" ? block.type : "unknown";
		contentTypes.push(type);

		if (type === "text" && typeof block.text === "string") {
			pushText(block.text);
			continue;
		}

		if (type === "image" && typeof block.data === "string" && typeof block.mimeType === "string") {
			content.push({ type: "image", data: block.data, mimeType: block.mimeType });
			textParts.push(`[image: ${block.mimeType}, ${block.data.length} base64 chars]`);
			continue;
		}

		if (type === "resource" && block.resource && typeof block.resource === "object") {
			const resource = block.resource as JsonObject;
			if (typeof resource.text === "string") {
				pushText(resource.text);
			} else {
				pushText(`[resource: ${typeof resource.uri === "string" ? resource.uri : "unknown"}]`);
			}
			continue;
		}

		if (type === "resource_link") {
			const name = typeof block.name === "string" ? block.name : "resource";
			const uri = typeof block.uri === "string" ? block.uri : "unknown-uri";
			pushText(`[resource_link: ${name} <${uri}>]`);
			continue;
		}

		pushText(stringifyUnknown(block));
	}

	if (content.length === 0 && result.structuredContent !== undefined) {
		pushText(stringifyUnknown(result.structuredContent));
	}

	if (content.length === 0) {
		pushText("Linear MCP tool completed with no content.");
	}

	return {
		content,
		contentTypes,
		truncated,
		textForError: textParts.join("\n\n").trim() || "Linear MCP tool returned an error.",
	};
}

function isMutationTool(tool: McpTool): boolean {
	if (tool.annotations?.readOnlyHint === true) return false;
	if (tool.annotations?.destructiveHint === true) return true;
	return /^(save|create|update|delete|archive|unarchive|prepare|upload|link|unlink|add|remove)_/i.test(tool.name);
}

async function maybeConfirmMutation(tool: RegisteredTool, params: JsonObject, ctx: ExtensionContext): Promise<void> {
	if (!shouldConfirmMutations() || !isMutationTool(tool.mcpTool) || !ctx.hasUI) return;
	const ok = await ctx.ui.confirm(
		"Confirm Linear mutation",
		`Run ${tool.upstreamName} against Linear?\n\nArguments:\n${truncateText(JSON.stringify(params, null, 2)).text}`,
	);
	if (!ok) {
		throw new Error(`Linear MCP tool ${tool.upstreamName} cancelled by user.`);
	}
}

async function writeSnapshot(tools: McpTool[]): Promise<void> {
	if (process.env.LINEAR_MCP_WRITE_SNAPSHOT === "0") return;
	try {
		const { mkdir, writeFile } = await import("node:fs/promises");
		const { join } = await import("node:path");
		const { homedir } = await import("node:os");
		const dir = join(homedir(), ".pi", "agent", "linear-mcp");
		await mkdir(dir, { recursive: true, mode: 0o700 });
		await writeFile(
			join(dir, "tools.latest.json"),
			JSON.stringify({ endpoint: getEndpoint(), capturedAt: new Date().toISOString(), tools }, null, 2),
			{ mode: 0o600 },
		);
	} catch {
		// Snapshotting is best effort and should never break tool registration.
	}
}

export default function linearMcpExtension(pi: ExtensionAPI): void {
	let connection: Connection | undefined;
	let connectionPromise: Promise<Connection> | undefined;
	let lastTools: McpTool[] = [];
	const registeredTools = new Map<string, RegisteredTool>();

	async function closeConnection(): Promise<void> {
		const current = connection;
		connection = undefined;
		connectionPromise = undefined;
		if (current) {
			try {
				await current.client.close();
			} catch {
				// Ignore close failures.
			}
		}
	}

	async function connect(force = false): Promise<Connection> {
		if (force) await closeConnection();
		if (connection) return connection;
		if (connectionPromise) return connectionPromise;

		connectionPromise = (async () => {
			const token = assertConfigured();
			const endpoint = getEndpoint();
			const client = new Client({ name: "pi-linear-mcp", version: EXTENSION_VERSION });
			const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
				requestInit: {
					headers: {
						Authorization: `Bearer ${token}`,
						"User-Agent": `pi-linear-mcp/${EXTENSION_VERSION}`,
					},
				},
			});

			try {
				await client.connect(transport, { timeout: 30_000 });
				connection = { client };
				return connection;
			} catch (error) {
				try {
					await client.close();
				} catch {
					// Ignore close failures.
				}
				throw error;
			} finally {
				connectionPromise = undefined;
			}
		})();

		return connectionPromise;
	}

	async function listAllTools(client: Client, signal?: AbortSignal): Promise<McpTool[]> {
		const tools: McpTool[] = [];
		let cursor: string | undefined;
		do {
			const page = await client.listTools(cursor ? { cursor } : undefined, { signal, timeout: 30_000 });
			for (const tool of page.tools) {
				tools.push({
					...(tool as unknown as McpTool),
					inputSchema: normalizeInputSchema(tool.inputSchema),
				});
			}
			cursor = page.nextCursor;
		} while (cursor);
		return tools;
	}

	function registerMirroredTool(mcpTool: McpTool): void {
		const piName = normalizeToolName(mcpTool.name);
		const registered: RegisteredTool = { piName, upstreamName: mcpTool.name, mcpTool };
		registeredTools.set(piName, registered);

		pi.registerTool({
			name: piName,
			label: mcpTool.title || mcpTool.annotations?.title || humanizeToolName(mcpTool.name),
			description: `Linear MCP mirror for upstream tool \`${mcpTool.name}\`. ${mcpTool.description || ""}`.trim(),
			promptSnippet: (mcpTool.description || `Call Linear MCP tool ${mcpTool.name}`).slice(0, 220),
			parameters: mcpTool.inputSchema as any,
			executionMode: isMutationTool(mcpTool) ? "sequential" : undefined,
			async execute(_toolCallId, params, signal, onUpdate, ctx) {
				const latest = registeredTools.get(piName) || registered;
				const args = asArguments(params);
				await maybeConfirmMutation(latest, args, ctx);

				const { client } = await connect();
				const result = (await client.callTool(
					{ name: latest.upstreamName, arguments: args },
					undefined,
					{
						signal,
						timeout: getTimeoutMs(),
						resetTimeoutOnProgress: true,
						onprogress: (progress) => {
							onUpdate?.({
								content: [{ type: "text", text: `Linear MCP progress: ${stringifyUnknown(progress)}` }],
								details: {
									upstreamTool: latest.upstreamName,
									piTool: latest.piName,
									endpoint: getEndpoint(),
									contentTypes: ["progress"],
									meta: progress,
								} satisfies LinearMcpDetails,
							});
						},
					},
				)) as JsonObject;

				const converted = convertMcpContent(result);
				if (result.isError === true) {
					throw new Error(converted.textForError);
				}

				return {
					content: converted.content,
					details: {
						upstreamTool: latest.upstreamName,
						piTool: latest.piName,
						endpoint: getEndpoint(),
						contentTypes: converted.contentTypes,
						structuredContent: result.structuredContent,
						meta: result._meta,
						truncated: converted.truncated || undefined,
					} satisfies LinearMcpDetails,
				};
			},
		});
	}

	async function refreshTools(ctx?: ExtensionContext, forceReconnect = false): Promise<McpTool[]> {
		const { client } = await connect(forceReconnect);
		const tools = await listAllTools(client, ctx?.signal);
		lastTools = tools;
		for (const tool of tools) registerMirroredTool(tool);
		void writeSnapshot(tools);
		return tools;
	}

	function setStatus(ctx: ExtensionContext, text: string): void {
		ctx.ui.setStatus(STATUS_KEY, text);
	}

	pi.on("session_start", async (_event, ctx) => {
		if (!getToken()) {
			setStatus(ctx, "Linear: not configured");
			return;
		}

		setStatus(ctx, "Linear: connecting…");
		try {
			const tools = await refreshTools(ctx);
			setStatus(ctx, `Linear: ${tools.length} tools`);
			ctx.ui.notify(`Linear MCP connected (${tools.length} tools).`, "info");
		} catch (error) {
			setStatus(ctx, "Linear: error");
			ctx.ui.notify(`Linear MCP failed: ${error instanceof Error ? error.message : String(error)}`, "error");
		}
	});

	pi.on("before_agent_start", (event) => {
		if (lastTools.length === 0) return;
		return {
			systemPrompt:
				event.systemPrompt +
				"\n\nLinear MCP extension: Linear tools in this session are live mirrors of Linear's official MCP server. Prefer read/list/get tools before mutating Linear. Use exact Linear identifiers like ENG-123 when available, and summarize every mutation after it completes.",
		};
	});

	pi.on("session_shutdown", async () => {
		await closeConnection();
	});

	pi.registerCommand("linear-status", {
		description: "Show Linear MCP connection status and mirrored tool count",
		handler: async (args, ctx) => {
			const configured = Boolean(getToken());
			const lines = [
				`Linear MCP endpoint: ${getEndpoint()}`,
				`Auth configured: ${configured ? "yes" : "no"}`,
				`Connected: ${connection ? "yes" : "no"}`,
				`Mirrored tools: ${lastTools.length}`,
			];
			if (args.trim() === "verbose" && lastTools.length > 0) {
				lines.push("", ...lastTools.map((tool) => `- ${normalizeToolName(tool.name)} -> ${tool.name}`));
			}
			ctx.ui.notify(lines.join("\n"), configured ? "info" : "warning");
		},
	});

	pi.registerCommand("linear-refresh-tools", {
		description: "Reconnect to Linear MCP and refresh mirrored tools",
		handler: async (_args, ctx) => {
			try {
				setStatus(ctx, "Linear: refreshing…");
				const tools = await refreshTools(ctx, true);
				setStatus(ctx, `Linear: ${tools.length} tools`);
				ctx.ui.notify(`Linear MCP refreshed (${tools.length} tools).`, "info");
			} catch (error) {
				setStatus(ctx, "Linear: error");
				ctx.ui.notify(`Linear MCP refresh failed: ${error instanceof Error ? error.message : String(error)}`, "error");
			}
		},
	});
}
