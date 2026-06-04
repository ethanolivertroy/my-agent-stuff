import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { StringEnum, Type } from "@mariozechner/pi-ai";
import {
	DEFAULT_MAX_BYTES,
	DEFAULT_MAX_LINES,
	defineTool,
	formatSize,
	getAgentDir,
	type ExtensionAPI,
	type ExtensionContext,
	truncateHead,
	withFileMutationQueue,
} from "@mariozechner/pi-coding-agent";

const SEARCH_TYPES = ["auto", "instant", "fast", "neural", "deep-lite", "deep", "deep-reasoning"] as const;
const CATEGORIES = ["company", "research paper", "news", "personal site", "financial report", "people"] as const;
const LIVECRAWL = ["never", "fallback", "preferred", "always"] as const;
const VERBOSITY = ["compact", "standard", "full"] as const;
const SECTIONS = ["header", "navigation", "banner", "body", "sidebar", "footer", "metadata"] as const;

type SearchType = (typeof SEARCH_TYPES)[number];
type CategoryType = (typeof CATEGORIES)[number];

const exaSearchParams = Type.Object({
	query: Type.String({ description: "Search query." }),
	additionalQueries: Type.Optional(Type.Array(Type.String(), { description: "Extra query variations for broader coverage." })),
	type: Type.Optional(StringEnum(SEARCH_TYPES, { description: "Search mode. auto is default." })),
	category: Type.Optional(StringEnum(CATEGORIES, { description: "Optional Exa category (people, company, news, etc.)." })),
	numResults: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, description: "Number of results to return." })),
	includeDomains: Type.Optional(Type.Array(Type.String(), { description: "Only return results from these domains." })),
	excludeDomains: Type.Optional(Type.Array(Type.String(), { description: "Exclude results from these domains." })),
	startCrawlDate: Type.Optional(Type.String({ description: "ISO 8601 date-time." })),
	endCrawlDate: Type.Optional(Type.String({ description: "ISO 8601 date-time." })),
	startPublishedDate: Type.Optional(Type.String({ description: "ISO 8601 date-time." })),
	endPublishedDate: Type.Optional(Type.String({ description: "ISO 8601 date-time." })),
	userLocation: Type.Optional(Type.String({ minLength: 2, maxLength: 2, description: "Two-letter ISO country code, e.g. US." })),
	moderation: Type.Optional(Type.Boolean({ description: "Enable moderation filtering." })),
	systemPrompt: Type.Optional(Type.String({ description: "Prompt for synthesized output behavior." })),
	outputSchema: Type.Optional(Type.Any({ description: "JSON schema for synthesized output." })),
	contents: Type.Optional(
		Type.Object(
			{
				text: Type.Optional(
					Type.Union([
						Type.Boolean(),
						Type.Object(
							{
								maxCharacters: Type.Optional(Type.Integer({ minimum: 1 })),
								includeHtmlTags: Type.Optional(Type.Boolean()),
								verbosity: Type.Optional(StringEnum(VERBOSITY)),
								includeSections: Type.Optional(Type.Array(StringEnum(SECTIONS))),
								excludeSections: Type.Optional(Type.Array(StringEnum(SECTIONS))),
							},
							{ additionalProperties: false },
						),
					]),
				),
				highlights: Type.Optional(
					Type.Union([
						Type.Boolean(),
						Type.Object(
							{
								maxCharacters: Type.Optional(Type.Integer({ minimum: 1 })),
								query: Type.Optional(Type.String()),
							},
							{ additionalProperties: false },
						),
					]),
				),
				summary: Type.Optional(
					Type.Object(
						{
							query: Type.Optional(Type.String()),
							schema: Type.Optional(Type.Any()),
						},
						{ additionalProperties: false },
					),
				),
				livecrawl: Type.Optional(StringEnum(LIVECRAWL)),
				livecrawlTimeout: Type.Optional(Type.Integer({ minimum: 100 })),
				maxAgeHours: Type.Optional(Type.Integer()),
				subpages: Type.Optional(Type.Integer({ minimum: 0 })),
				subpageTarget: Type.Optional(Type.Union([Type.String(), Type.Array(Type.String())])),
				extras: Type.Optional(
					Type.Object(
						{
							links: Type.Optional(Type.Integer({ minimum: 0 })),
							imageLinks: Type.Optional(Type.Integer({ minimum: 0 })),
						},
						{ additionalProperties: false },
					),
				),
			},
			{ additionalProperties: false },
		),
	),
});

type ExaSearchParams = {
	query: string;
	additionalQueries?: string[];
	type?: SearchType;
	category?: CategoryType;
	numResults?: number;
	includeDomains?: string[];
	excludeDomains?: string[];
	startCrawlDate?: string;
	endCrawlDate?: string;
	startPublishedDate?: string;
	endPublishedDate?: string;
	userLocation?: string;
	moderation?: boolean;
	systemPrompt?: string;
	outputSchema?: unknown;
	contents?: unknown;
};

interface ExaResult {
	title?: string;
	url?: string;
	publishedDate?: string | null;
	author?: string | null;
	id?: string;
	highlights?: string[];
	summary?: string;
	text?: string;
}

interface ExaSearchResponse {
	requestId?: string;
	searchType?: string;
	results?: ExaResult[];
	output?: unknown;
	costDollars?: unknown;
}

function compactText(input: string, max = 1200) {
	if (input.length <= max) return input;
	return `${input.slice(0, max)}...`;
}

function stripUndefined<T>(value: T): T {
	if (Array.isArray(value)) {
		return value
			.filter((item) => item !== undefined)
			.map((item) => stripUndefined(item)) as unknown as T;
	}
	if (value && typeof value === "object") {
		const out: Record<string, unknown> = {};
		for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
			if (item === undefined) continue;
			out[key] = stripUndefined(item);
		}
		return out as T;
	}
	return value;
}

function validateCategoryFilterRules(params: ExaSearchParams) {
	if (!params.category) return;

	const unsupportedForCompanyPeople = [
		"startPublishedDate",
		"endPublishedDate",
		"startCrawlDate",
		"endCrawlDate",
		"excludeDomains",
	] as const;

	if (params.category === "people" || params.category === "company") {
		for (const field of unsupportedForCompanyPeople) {
			if (params[field] !== undefined) {
				throw new Error(
					`${field} is not supported when category is \"${params.category}\". Remove that filter or use a non-people/company category.`,
				);
			}
		}
	}

	if (params.category === "people" && params.includeDomains?.length) {
		const invalid = params.includeDomains.filter((domain) => !domain.toLowerCase().includes("linkedin."));
		if (invalid.length > 0) {
			throw new Error(
				`people category only accepts LinkedIn domains in includeDomains. Invalid values: ${invalid.join(", ")}`,
			);
		}
	}
}

function buildPayload(params: ExaSearchParams) {
	return stripUndefined({
		query: params.query,
		additionalQueries: params.additionalQueries,
		type: params.type ?? "auto",
		category: params.category,
		numResults: params.numResults,
		includeDomains: params.includeDomains,
		excludeDomains: params.excludeDomains,
		startCrawlDate: params.startCrawlDate,
		endCrawlDate: params.endCrawlDate,
		startPublishedDate: params.startPublishedDate,
		endPublishedDate: params.endPublishedDate,
		userLocation: params.userLocation,
		moderation: params.moderation,
		systemPrompt: params.systemPrompt,
		outputSchema: params.outputSchema,
		contents: params.contents,
	});
}

async function readTextFileIfExists(path: string) {
	try {
		return await readFile(path, "utf8");
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
		throw error;
	}
}

function resolveKeyReference(value: string) {
	const candidate = value.trim();
	if (!candidate) return undefined;

	if (/^[A-Z0-9_]+$/.test(candidate)) {
		const envValue = process.env[candidate];
		if (envValue?.trim()) return envValue.trim();
	}

	return candidate;
}

async function getExaApiKey() {
	const agentDir = getAgentDir();

	// Preferred location for consistency with pi docs: ~/.pi/agent/auth.json
	const authFilePath = join(agentDir, "auth.json");
	const authRaw = await readTextFileIfExists(authFilePath);
	if (authRaw) {
		let parsed: Record<string, unknown>;
		try {
			parsed = JSON.parse(authRaw) as Record<string, unknown>;
		} catch (error) {
			throw new Error(`Invalid JSON in ${authFilePath}: ${error instanceof Error ? error.message : String(error)}`);
		}

		const entry = parsed.exa;
		if (entry && typeof entry === "object") {
			const keyValue = (entry as { key?: unknown }).key;
			if (typeof keyValue === "string") {
				const resolved = resolveKeyReference(keyValue);
				if (resolved) return resolved;
			}
		}
	}

	// Optional Exa-specific file fallback (kept for convenience)
	const jsonConfigPaths = [join(agentDir, "exa.json"), join(agentDir, "secrets", "exa.json")];
	for (const configPath of jsonConfigPaths) {
		const raw = await readTextFileIfExists(configPath);
		if (!raw) continue;
		let parsed: { apiKey?: string; exaApiKey?: string; EXA_API_KEY?: string };
		try {
			parsed = JSON.parse(raw);
		} catch (error) {
			throw new Error(`Invalid JSON in ${configPath}: ${error instanceof Error ? error.message : String(error)}`);
		}
		const candidate = parsed.apiKey ?? parsed.exaApiKey ?? parsed.EXA_API_KEY;
		if (candidate?.trim()) return candidate.trim();
	}

	const keyFilePaths = [join(agentDir, "exa.key"), join(agentDir, "secrets", "exa.key")];
	for (const keyPath of keyFilePaths) {
		const raw = await readTextFileIfExists(keyPath);
		if (raw?.trim()) return raw.trim();
	}

	const envApiKey = process.env.EXA_API_KEY ?? process.env.EXA_APIKEY;
	if (envApiKey?.trim()) return envApiKey.trim();

	throw new Error(
		`Missing Exa API key. Add auth entry in ${authFilePath}: {"exa":{"type":"api_key","key":"..."}}`,
	);
}

async function runExaSearch(params: ExaSearchParams, signal?: AbortSignal) {
	validateCategoryFilterRules(params);
	const payload = buildPayload(params);
	const apiKey = await getExaApiKey();

	const response = await fetch("https://api.exa.ai/search", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apiKey,
		},
		body: JSON.stringify(payload),
		signal,
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Exa search failed (${response.status}): ${body}`);
	}

	const data = (await response.json()) as ExaSearchResponse;
	const trimmed = {
		requestId: data.requestId ?? null,
		searchType: data.searchType ?? params.type ?? "auto",
		costDollars: data.costDollars ?? null,
		output: data.output ?? null,
		results: (data.results ?? []).map((result, index) => ({
			rank: index + 1,
			title: result.title ?? "",
			url: result.url ?? "",
			publishedDate: result.publishedDate ?? null,
			author: result.author ?? null,
			id: result.id ?? null,
			highlights: Array.isArray(result.highlights) ? result.highlights.slice(0, 5).map((h) => compactText(h, 600)) : [],
			summary: typeof result.summary === "string" ? compactText(result.summary, 1200) : null,
			text: typeof result.text === "string" ? compactText(result.text, 1500) : null,
		})),
	};

	return {
		payload,
		data: trimmed,
	};
}

async function formatToolOutput(search: { payload: unknown; data: unknown }) {
	const fullOutput = JSON.stringify(search.data, null, 2);
	const truncation = truncateHead(fullOutput, {
		maxLines: DEFAULT_MAX_LINES,
		maxBytes: DEFAULT_MAX_BYTES,
	});

	let text = truncation.content;
	let fullOutputPath: string | undefined;

	if (truncation.truncated) {
		const tempDir = await mkdtemp(join(tmpdir(), "pi-exa-"));
		fullOutputPath = join(tempDir, "exa-search-results.json");
		await withFileMutationQueue(fullOutputPath, async () => {
			await writeFile(fullOutputPath!, fullOutput, "utf8");
		});

		text += `\n\n[Output truncated: showing ${truncation.outputLines} of ${truncation.totalLines} lines`;
		text += ` (${formatSize(truncation.outputBytes)} of ${formatSize(truncation.totalBytes)}).`;
		text += ` Full output saved to: ${fullOutputPath}]`;
	}

	return {
		text,
		truncation,
		fullOutputPath,
	};
}

async function searchWithDefaults(query: string, ctx: ExtensionContext) {
	return runExaSearch(
		{
			query,
			type: "auto",
			numResults: 10,
			contents: {
				highlights: {
					maxCharacters: 4000,
				},
			},
		},
		ctx.signal,
	);
}

const exaTool = defineTool({
	name: "web_search_advanced_exa",
	label: "Exa Search",
	description:
		"Search the web with Exa. Supports people/company categories, deep search, domain filters, and optional page contents (highlights/text/summary).",
	promptSnippet:
		"Search the web with Exa using query, optional category, and contents options. Good for people/company discovery and synthesis-ready results.",
	promptGuidelines: [
		"Use this tool when the user asks for Exa-based web research or people/company search.",
		"Set category=people or category=company when the user asks for people/company discovery.",
		"For broader coverage, provide additionalQueries and merge results in your analysis.",
	],
	parameters: exaSearchParams,
	async execute(_toolCallId, params, signal, onUpdate, _ctx) {
		onUpdate?.({
			content: [{ type: "text", text: `Searching Exa for: ${params.query}` }],
			details: { phase: "search" },
		});

		if (signal?.aborted) throw new Error("Exa search aborted.");

		const search = await runExaSearch(params, signal);
		const formatted = await formatToolOutput(search);

		return {
			content: [{ type: "text", text: formatted.text }],
			details: {
				request: search.payload,
				response: search.data,
				truncated: formatted.truncation.truncated,
				fullOutputPath: formatted.fullOutputPath,
			},
		};
	},
});

export default function exaSearchExtension(pi: ExtensionAPI) {
	pi.registerTool(exaTool);

	pi.registerCommand("exa", {
		description: "Run a quick Exa search and paste JSON results into the editor",
		handler: async (args, ctx) => {
			const query = args.trim() || (await ctx.ui.input("Exa query", ""))?.trim();
			if (!query) {
				ctx.ui.notify("Exa search cancelled.", "info");
				return;
			}

			ctx.ui.setStatus("exa", "Searching Exa...");
			try {
				const search = await searchWithDefaults(query, ctx);
				const formatted = await formatToolOutput(search);
				ctx.ui.setEditorText(formatted.text);
				ctx.ui.notify("Exa results added to editor.", "info");
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				ctx.ui.notify(`Exa search failed: ${message}`, "error");
			} finally {
				ctx.ui.setStatus("exa", undefined);
			}
		},
	});
}
