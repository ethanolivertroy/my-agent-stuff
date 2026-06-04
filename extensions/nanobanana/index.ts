import { randomUUID } from "node:crypto";
import { access } from "node:fs/promises";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, extname, join } from "node:path";
import { Type } from "@mariozechner/pi-ai";
import {
	defineTool,
	type ExtensionAPI,
	type ExtensionContext,
	getAgentDir,
	withFileMutationQueue,
} from "@mariozechner/pi-coding-agent";

const PRO_MODEL = "gemini-3-pro-image-preview";
const FAST_MODEL = "gemini-2.5-flash-image";

const toolParams = Type.Object({
	prompt: Type.String({ description: "Prompt describing the image to generate or the edit to apply." }),
	input_image_path: Type.Optional(
		Type.String({ description: "Optional local image path for edit mode. Leave unset for text-to-image." }),
	),
	output_dir: Type.Optional(
		Type.String({ description: "Optional output directory. Defaults to ~/Pictures/pi-gen/YYYY-MM-DD/." }),
	),
});

interface GoogleAuthResolver {
	modelRegistry: { getApiKeyForProvider: (provider: string) => Promise<string | undefined> };
}

interface ImagePart {
	inlineData?: {
		mimeType?: string;
		data?: string;
	};
	text?: string;
}

interface GenerateResponse {
	candidates?: Array<{
		content?: {
			parts?: ImagePart[];
		};
	}>;
	promptFeedback?: { blockReason?: string };
	error?: { message?: string };
}

interface GeneratedImage {
	data: string;
	mimeType: string;
}

interface RunParams {
	prompt: string;
	inputImagePath?: string;
	outputDir?: string;
	model?: string;
}

function defaultOutputDir() {
	const day = new Date().toISOString().slice(0, 10);
	return join(homedir(), "Pictures", "pi-gen", day);
}

function imageExtension(mimeType: string) {
	const lower = mimeType.toLowerCase();
	if (lower.includes("jpeg") || lower.includes("jpg")) return "jpg";
	if (lower.includes("webp")) return "webp";
	if (lower.includes("gif")) return "gif";
	return "png";
}

function imageMimeFromPath(path: string) {
	const ext = extname(path).toLowerCase();
	if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
	if (ext === ".webp") return "image/webp";
	if (ext === ".gif") return "image/gif";
	return "image/png";
}

async function getGoogleApiKey(ctx: GoogleAuthResolver) {
	const apiKey = await ctx.modelRegistry.getApiKeyForProvider("google");
	if (apiKey) return apiKey;

	try {
		const authPath = join(getAgentDir(), "auth.json");
		const raw = await readFile(authPath, "utf8");
		const parsed = JSON.parse(raw) as { google?: { key?: string } };
		if (parsed.google?.key) return parsed.google.key;
	} catch {
		// Fall through to env check and final error.
	}

	if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;

	throw new Error("Missing Google API key. Add the built-in google provider key in ~/.pi/agent/auth.json.");
}

async function readLocalImage(path: string) {
	await access(path);
	const buffer = await readFile(path);
	return {
		mimeType: imageMimeFromPath(path),
		data: buffer.toString("base64"),
	};
}

function buildRequestBody(prompt: string, image?: { mimeType: string; data: string }) {
	const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [{ text: prompt }];
	if (image) {
		parts.unshift({
			inlineData: {
				mimeType: image.mimeType,
				data: image.data,
			},
		});
	}

	return {
		contents: [
			{
				role: "user",
				parts,
			},
		],
		generationConfig: {
			responseModalities: ["TEXT", "IMAGE"],
		},
	};
}

async function parseResponse(response: Response) {
	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Nano Banana request failed (${response.status}): ${errorText}`);
	}

	const payload = (await response.json()) as GenerateResponse;
	if (payload.error?.message) {
		throw new Error(payload.error.message);
	}
	if (payload.promptFeedback?.blockReason) {
		throw new Error(`Prompt blocked: ${payload.promptFeedback.blockReason}`);
	}

	const images: GeneratedImage[] = [];
	const notes: string[] = [];
	for (const candidate of payload.candidates || []) {
		for (const part of candidate.content?.parts || []) {
			if (part.text) notes.push(part.text);
			if (part.inlineData?.data) {
				images.push({
					data: part.inlineData.data,
					mimeType: part.inlineData.mimeType || "image/png",
				});
			}
		}
	}

	if (images.length === 0) {
		throw new Error("No image data returned by Gemini image generation.");
	}

	return { images, notes };
}

async function saveImage(image: GeneratedImage, outputDir: string, prefix = "nanobanana") {
	const stamp = new Date().toISOString().replace(/[:.]/g, "-");
	const ext = imageExtension(image.mimeType);
	const filePath = join(outputDir, `${prefix}-${stamp}-${randomUUID().slice(0, 8)}.${ext}`);
	await withFileMutationQueue(filePath, async () => {
		await mkdir(outputDir, { recursive: true });
		await writeFile(filePath, Buffer.from(image.data, "base64"));
	});
	return filePath;
}

async function runNanobanana(params: RunParams, ctx: ExtensionContext) {
	const apiKey = await getGoogleApiKey(ctx);
	const outputDir = params.outputDir?.trim() || defaultOutputDir();
	const inputImage = params.inputImagePath?.trim() ? await readLocalImage(params.inputImagePath.trim()) : undefined;
	const model = params.model || PRO_MODEL;
	const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
	const response = await fetch(apiUrl, {
		method: "POST",
		headers: {
			"x-goog-api-key": apiKey,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(buildRequestBody(params.prompt, inputImage)),
	});
	const parsed = await parseResponse(response);
	const savedPaths = await Promise.all(
		parsed.images.map((image, index) => saveImage(image, outputDir, index === 0 ? "nanobanana" : `nanobanana-${index + 1}`)),
	);

	return {
		savedPaths,
		notes: parsed.notes,
		outputDir,
		mode: inputImage ? "edit" : "generate",
	};
}

async function resolveCommandParams(args: string, ctx: ExtensionContext): Promise<RunParams | null> {
	const trimmed = args.trim();
	if (trimmed) {
		return { prompt: trimmed };
	}

	const mode = await ctx.ui.select("Nano Banana mode", ["Generate", "Edit"]);
	if (!mode) return null;

	const prompt = await ctx.ui.editor("Nano Banana prompt", "");
	if (!prompt?.trim()) return null;

	let inputImagePath: string | undefined;
	if (mode === "Edit") {
		const pathInput = await ctx.ui.input("Local image path", "~/Pictures/example.png");
		if (!pathInput?.trim()) {
			ctx.ui.notify("Image editing requires a local image path.", "error");
			return null;
		}
		inputImagePath = pathInput.trim().replace(/^~(?=$|\/)/, homedir());
	}

	const outputDirInput = await ctx.ui.input("Output directory (blank for default)", defaultOutputDir());
	const outputDir = outputDirInput?.trim() ? outputDirInput.trim().replace(/^~(?=$|\/)/, homedir()) : undefined;

	return {
		prompt: prompt.trim(),
		inputImagePath,
		outputDir,
	};
}

function buildSummary(result: { savedPaths: string[]; notes: string[]; mode: string }) {
	const lines = [
		`${result.mode === "edit" ? "Image edit" : "Image generation"} complete.`,
		`Saved ${result.savedPaths.length} image${result.savedPaths.length === 1 ? "" : "s"}:`,
		...result.savedPaths.map((path) => `- ${path}`),
	];
	if (result.notes.length > 0) {
		lines.push("", `Model notes: ${result.notes.join(" ")}`);
	}
	return lines.join("\n");
}

const nanobananaTool = defineTool({
	name: "nanobanana_generate",
	label: "Nano Banana",
	description:
		"Generate or edit images using Google Gemini Nano Banana Pro. Use this when the user asks to create or modify an image. Returns saved file paths and inline images.",
	parameters: toolParams,
	async execute(_toolCallId, params, signal, onUpdate, ctx) {
			onUpdate?.({
				content: [{ type: "text", text: `Running Nano Banana Pro (${params.input_image_path ? "edit" : "generate"})...` }],
				details: { model: PRO_MODEL },
			});

		if (signal?.aborted) {
			throw new Error("Request aborted");
		}

		const result = await runNanobanana(
				{
					prompt: params.prompt,
					inputImagePath: params.input_image_path,
					outputDir: params.output_dir,
					model: PRO_MODEL,
				},
				ctx,
			);

		const images = await Promise.all(
			result.savedPaths.map(async (path) => ({
				type: "image" as const,
				data: (await readFile(path)).toString("base64"),
				mimeType: imageMimeFromPath(path),
			})),
		);

			return {
				content: [{ type: "text", text: buildSummary(result) }, ...images],
				details: { model: PRO_MODEL, savedPaths: result.savedPaths, outputDir: result.outputDir, mode: result.mode },
			};
		},
	});

const nanobananaFastTool = defineTool({
	name: "nanobanana_fast_generate",
	label: "Nano Banana Fast",
	description:
		"Generate or edit images using Google Gemini 2.5 Flash Image. Use this when the user asks for a faster or cheaper image generation option.",
	parameters: toolParams,
	async execute(_toolCallId, params, signal, onUpdate, ctx) {
		onUpdate?.({
			content: [{ type: "text", text: `Running Nano Banana Fast (${params.input_image_path ? "edit" : "generate"})...` }],
			details: { model: FAST_MODEL },
		});

		if (signal?.aborted) {
			throw new Error("Request aborted");
		}

		const result = await runNanobanana(
			{
				prompt: params.prompt,
				inputImagePath: params.input_image_path,
				outputDir: params.output_dir,
				model: FAST_MODEL,
			},
			ctx,
		);

		const images = await Promise.all(
			result.savedPaths.map(async (path) => ({
				type: "image" as const,
				data: (await readFile(path)).toString("base64"),
				mimeType: imageMimeFromPath(path),
			})),
		);

		return {
			content: [{ type: "text", text: buildSummary(result) }, ...images],
			details: { model: FAST_MODEL, savedPaths: result.savedPaths, outputDir: result.outputDir, mode: result.mode },
		};
	},
});

export default function nanobananaExtension(pi: ExtensionAPI) {
	pi.registerTool(nanobananaTool);
	pi.registerTool(nanobananaFastTool);

	pi.registerCommand("nanobanana", {
		description: "Generate or edit images with Nano Banana Pro",
		handler: async (args, ctx) => {
			const params = await resolveCommandParams(args, ctx);
			if (!params) {
				ctx.ui.notify("Nano Banana cancelled.", "info");
				return;
			}

			ctx.ui.setStatus("nanobanana", `Running ${basename(PRO_MODEL)}...`);
			try {
				const result = await runNanobanana({ ...params, model: PRO_MODEL }, ctx);
				ctx.ui.notify(`Saved ${result.savedPaths.length} image(s) to ${result.outputDir}`, "info");
				ctx.ui.setEditorText(buildSummary(result));
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				ctx.ui.notify(`Nano Banana failed: ${message}`, "error");
			} finally {
				ctx.ui.setStatus("nanobanana", undefined);
			}
		},
	});

	pi.registerCommand("nanobanana-fast", {
		description: "Generate or edit images with Nano Banana Fast",
		handler: async (args, ctx) => {
			const params = await resolveCommandParams(args, ctx);
			if (!params) {
				ctx.ui.notify("Nano Banana Fast cancelled.", "info");
				return;
			}

			ctx.ui.setStatus("nanobanana-fast", `Running ${basename(FAST_MODEL)}...`);
			try {
				const result = await runNanobanana({ ...params, model: FAST_MODEL }, ctx);
				ctx.ui.notify(`Saved ${result.savedPaths.length} image(s) to ${result.outputDir}`, "info");
				ctx.ui.setEditorText(buildSummary(result));
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				ctx.ui.notify(`Nano Banana Fast failed: ${message}`, "error");
			} finally {
				ctx.ui.setStatus("nanobanana-fast", undefined);
			}
		},
	});
}
