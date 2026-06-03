import { execFile } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

export type SecretSourceKind = "proton-pass" | "1password" | "environment" | "command" | "misconfigured";

export type SecretSourceInfo = {
	kind: SecretSourceKind;
	label: string;
};

export type SecretResolverConfig = {
	/** Human label used in safe error messages, e.g. "Linear MCP". */
	serviceName: string;
	/** Env prefix used for manager-specific variables, e.g. LINEAR_MCP. */
	envPrefix: string;
	/** Plain environment token variables kept as last-resort fallback. */
	staticEnvNames?: string[];
	/** Extra ref variables. Defaults include <PREFIX>_SECRET_REF and <PREFIX>_TOKEN_REF. */
	refEnvNames?: string[];
	/** Shell command variables. Defaults include <PREFIX>_SECRET_COMMAND and <PREFIX>_TOKEN_COMMAND. */
	commandEnvNames?: string[];
	/** Display name for the value, e.g. "token". Never include the value itself. */
	secretName?: string;
	/** Override the default not-configured message. */
	notConfiguredMessage?: string;
	/** Load safe reference metadata from .env.local/.env. Defaults to true. */
	loadEnvFiles?: boolean | SecretEnvFileOptions;
};

export type ResolveSecretOptions = {
	/** Ignore the in-memory cache and fetch from the password manager again. */
	forceRefresh?: boolean;
};

export type SecretResolver = {
	getConfiguredSource(): string | undefined;
	getConfiguredSourceInfo(): SecretSourceInfo | undefined;
	resolve(options?: ResolveSecretOptions): Promise<string>;
	clear(): void;
};

export type SecretEnvFileOptions = {
	cwd?: string;
	paths?: string[];
	prefixes?: string[];
	allowedNames?: string[];
	overwrite?: boolean;
};

type ParsedEnvLine = {
	name: string;
	value: string;
};

type SecretSource = SecretSourceInfo & {
	fingerprint: string;
	resolve(): Promise<string>;
};

function getEnv(name: string): string | undefined {
	const value = process.env[name]?.trim();
	return value || undefined;
}

function unique(values: Array<string | undefined>): string[] {
	return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function prefixName(prefix: string, suffix: string): string {
	return `${prefix}_${suffix}`;
}

function stripInlineComment(raw: string): string {
	let quote: string | undefined;
	for (let i = 0; i < raw.length; i += 1) {
		const ch = raw[i];
		if ((ch === "'" || ch === '"') && raw[i - 1] !== "\\") {
			quote = quote === ch ? undefined : quote || ch;
			continue;
		}
		if (!quote && ch === "#" && (i === 0 || /\s/.test(raw[i - 1] || ""))) {
			return raw.slice(0, i).trimEnd();
		}
	}
	return raw.trimEnd();
}

function parseEnvValue(rawValue: string): string {
	const raw = stripInlineComment(rawValue.trim());
	if (!raw) return "";

	const quote = raw[0];
	if ((quote === "'" || quote === '"') && raw.endsWith(quote)) {
		const inner = raw.slice(1, -1);
		if (quote === "'") return inner;
		return inner
			.replace(/\\n/g, "\n")
			.replace(/\\r/g, "\r")
			.replace(/\\t/g, "\t")
			.replace(/\\"/g, '"')
			.replace(/\\\\/g, "\\");
	}

	return raw;
}

function parseEnvLine(line: string): ParsedEnvLine | undefined {
	let trimmed = line.trim();
	if (!trimmed || trimmed.startsWith("#")) return undefined;
	if (trimmed.startsWith("export ")) trimmed = trimmed.slice("export ".length).trimStart();

	const equalsIndex = trimmed.indexOf("=");
	if (equalsIndex <= 0) return undefined;

	const name = trimmed.slice(0, equalsIndex).trim();
	if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) return undefined;

	return { name, value: parseEnvValue(trimmed.slice(equalsIndex + 1)) };
}

function isSafeSecretConfigEnvName(name: string, prefixes: string[], allowedNames: Set<string>): boolean {
	if (allowedNames.has(name)) return true;
	if (prefixes.length > 0 && !prefixes.some((prefix) => name.startsWith(`${prefix}_`))) return false;

	// Never auto-load raw secret material from .env files. Users can still export those manually.
	if (/(^|_)(TOKEN|PASSWORD|SECRET|API_KEY|ACCESS_TOKEN|PRIVATE_KEY)$/.test(name)) return false;

	return (
		name.endsWith("_REF") ||
		name.endsWith("_URI") ||
		name.endsWith("_VAULT") ||
		name.endsWith("_ITEM") ||
		name.endsWith("_FIELD") ||
		name.endsWith("_CLI")
	);
}

export function loadSecretEnvFilesSync(options: SecretEnvFileOptions = {}): string[] {
	const cwd = options.cwd || process.cwd();
	const paths = options.paths || [".env.local", ".env"];
	const prefixes = options.prefixes || [];
	const allowedNames = new Set(options.allowedNames || []);
	const loaded: string[] = [];

	for (const envPath of paths) {
		const absolutePath = isAbsolute(envPath) ? envPath : join(cwd, envPath);
		if (!existsSync(absolutePath)) continue;

		const content = readFileSync(absolutePath, "utf8");
		for (const line of content.split(/\r?\n/)) {
			const parsed = parseEnvLine(line);
			if (!parsed) continue;
			if (!isSafeSecretConfigEnvName(parsed.name, prefixes, allowedNames)) continue;
			if (!options.overwrite && process.env[parsed.name] !== undefined) continue;
			process.env[parsed.name] = parsed.value;
			loaded.push(parsed.name);
		}
	}

	return loaded;
}

function normalizeSecretOutput(output: string, source: string): string {
	const secret = output.trim();
	if (!secret) throw new Error(`${source} produced an empty value.`);

	const nonEmptyLines = secret.split(/\r?\n/).filter((line) => line.trim().length > 0);
	if (nonEmptyLines.length > 1) {
		throw new Error(`${source} produced multiple lines. Point the secret reference at one field.`);
	}

	return secret;
}

async function execSecret(command: string, args: string[], label: string): Promise<string> {
	return new Promise((resolve, reject) => {
		execFile(command, args, { timeout: 30_000, maxBuffer: 1024 * 1024, encoding: "utf8" }, (error, stdout) => {
			if (error) {
				// Do not include stderr, stdout, args, refs, or command strings in LLM-visible errors.
				reject(new Error(`${label} failed. Check local CLI authentication and secret reference.`));
				return;
			}

			try {
				resolve(normalizeSecretOutput(stdout, label));
			} catch (normalizeError) {
				reject(normalizeError);
			}
		});
	});
}

function getOnePasswordCli(prefix: string): string {
	return getEnv(prefixName(prefix, "1PASSWORD_CLI")) || getEnv("PI_SECRETS_1PASSWORD_CLI") || "op";
}

function getProtonPassCli(prefix: string): string {
	return (
		getEnv(prefixName(prefix, "PROTON_PASS_CLI")) ||
		getEnv(prefixName(prefix, "PROTONPASS_CLI")) ||
		getEnv("PI_SECRETS_PROTON_PASS_CLI") ||
		getEnv("PI_SECRETS_PROTONPASS_CLI") ||
		"pass-cli"
	);
}

function refSource(prefix: string, envName: string, ref: string): SecretSource {
	if (ref.startsWith("op://")) {
		return {
			kind: "1password",
			label: "1Password CLI",
			fingerprint: `${envName}:${ref}`,
			resolve: () => execSecret(getOnePasswordCli(prefix), ["read", ref], "1Password CLI"),
		};
	}

	if (ref.startsWith("pass://")) {
		return {
			kind: "proton-pass",
			label: "Proton Pass CLI (URI ref)",
			fingerprint: `${envName}:${ref}`,
			resolve: () => execSecret(getProtonPassCli(prefix), ["item", "view", ref], "Proton Pass CLI"),
		};
	}

	return {
		kind: "misconfigured",
		label: "unsupported secret reference",
		fingerprint: `${envName}:unsupported-ref`,
		resolve: async () => {
			throw new Error(`Unsupported secret reference for ${envName}. Use op:// or pass://.`);
		},
	};
}

function protonNamedSource(prefix: string): SecretSource | undefined {
	const vault = getEnv(prefixName(prefix, "PROTON_PASS_VAULT")) || getEnv(prefixName(prefix, "PROTONPASS_VAULT"));
	const item = getEnv(prefixName(prefix, "PROTON_PASS_ITEM")) || getEnv(prefixName(prefix, "PROTONPASS_ITEM"));
	const field = getEnv(prefixName(prefix, "PROTON_PASS_FIELD")) || getEnv(prefixName(prefix, "PROTONPASS_FIELD")) || "password";

	if (!vault && !item) return undefined;
	if (!vault || !item) {
		return {
			kind: "misconfigured",
			label: "Proton Pass CLI (incomplete vault/item config)",
			fingerprint: "proton-pass-incomplete",
			resolve: async () => {
				throw new Error(`Incomplete Proton Pass config for ${prefix}. Set both ${prefix}_PROTON_PASS_VAULT and ${prefix}_PROTON_PASS_ITEM, or use ${prefix}_SECRET_REF.`);
			},
		};
	}

	return {
		kind: "proton-pass",
		label: "Proton Pass CLI (vault/item)",
		fingerprint: `proton:${vault}:${item}:${field}`,
		resolve: () =>
			execSecret(
				getProtonPassCli(prefix),
				["item", "view", "--vault-name", vault, "--item-title", item, "--field", field],
				"Proton Pass CLI",
			),
	};
}

function inspectSource(config: Required<Pick<SecretResolverConfig, "serviceName" | "envPrefix" | "secretName">> & SecretResolverConfig): SecretSource | undefined {
	const prefix = config.envPrefix;
	const refEnvNames = unique([
		...(config.refEnvNames || []),
		prefixName(prefix, "SECRET_REF"),
		prefixName(prefix, "TOKEN_REF"),
	]);

	for (const envName of refEnvNames) {
		const ref = getEnv(envName);
		if (ref) return refSource(prefix, envName, ref);
	}

	const protonRef = getEnv(prefixName(prefix, "PROTON_PASS_REF")) || getEnv(prefixName(prefix, "PROTONPASS_REF"));
	if (protonRef) return refSource(prefix, prefixName(prefix, "PROTON_PASS_REF"), protonRef);

	const protonNamed = protonNamedSource(prefix);
	if (protonNamed) return protonNamed;

	const onePasswordRef = getEnv(prefixName(prefix, "1PASSWORD_REF"));
	if (onePasswordRef) return refSource(prefix, prefixName(prefix, "1PASSWORD_REF"), onePasswordRef);

	for (const envName of config.staticEnvNames || []) {
		const value = getEnv(envName);
		if (value) {
			return {
				kind: "environment",
				label: "environment token",
				fingerprint: `${envName}:set`,
				resolve: async () => value,
			};
		}
	}

	const commandEnvNames = unique([...(config.commandEnvNames || []), prefixName(prefix, "SECRET_COMMAND"), prefixName(prefix, "TOKEN_COMMAND")]);
	for (const envName of commandEnvNames) {
		const command = getEnv(envName);
		if (command) {
			return {
				kind: "command",
				label: "token command",
				fingerprint: `${envName}:set`,
				resolve: () => execSecret("/bin/sh", ["-lc", command], envName),
			};
		}
	}

	return undefined;
}

export function createSecretResolver(config: SecretResolverConfig): SecretResolver {
	const normalizedConfig = {
		secretName: "secret",
		...config,
	};

	if (normalizedConfig.loadEnvFiles !== false) {
		const envFileOptions = typeof normalizedConfig.loadEnvFiles === "object" ? normalizedConfig.loadEnvFiles : {};
		loadSecretEnvFilesSync({ ...envFileOptions, prefixes: unique([...(envFileOptions.prefixes || []), normalizedConfig.envPrefix]) });
	}

	let cachedFingerprint: string | undefined;
	let cachedSecret: string | undefined;
	let cachedPromise: Promise<string> | undefined;

	function source(): SecretSource | undefined {
		return inspectSource(normalizedConfig);
	}

	async function resolve(options: ResolveSecretOptions = {}): Promise<string> {
		const currentSource = source();
		if (!currentSource) {
			throw new Error(
				normalizedConfig.notConfiguredMessage ||
					`${normalizedConfig.serviceName} is not configured. Set ${normalizedConfig.envPrefix}_SECRET_REF to an op:// or pass:// reference.`,
			);
		}

		if (!options.forceRefresh && cachedSecret && cachedFingerprint === currentSource.fingerprint) return cachedSecret;
		if (!options.forceRefresh && cachedPromise && cachedFingerprint === currentSource.fingerprint) return cachedPromise;

		cachedFingerprint = currentSource.fingerprint;
		cachedPromise = currentSource.resolve().then((secret) => {
			cachedSecret = secret;
			cachedPromise = undefined;
			return secret;
		});

		try {
			return await cachedPromise;
		} catch (error) {
			cachedPromise = undefined;
			cachedSecret = undefined;
			throw error;
		}
	}

	return {
		getConfiguredSource(): string | undefined {
			return source()?.label;
		},
		getConfiguredSourceInfo(): SecretSourceInfo | undefined {
			const currentSource = source();
			return currentSource ? { kind: currentSource.kind, label: currentSource.label } : undefined;
		},
		resolve,
		clear(): void {
			cachedFingerprint = undefined;
			cachedSecret = undefined;
			cachedPromise = undefined;
		},
	};
}
