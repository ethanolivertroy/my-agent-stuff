import type { OAuthCredentials, OAuthLoginCallbacks } from "@earendil-works/pi-ai";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { existsSync, readFileSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { homedir } from "node:os";
import { join } from "node:path";

const PROVIDER_NAME = process.env.PI_GROK_PROVIDER_NAME || "grok-cli";
const DEFAULT_BASE_URL = "https://cli-chat-proxy.grok.com/v1";
const BASE_URL = sanitizeBaseUrl(process.env.GROK_CLI_CHAT_PROXY_BASE_URL) || DEFAULT_BASE_URL;
const DEFAULT_CLI_VERSION = "0.2.16";
const LOGIN_CALLBACK_PORT = Number(process.env.PI_GROK_LOGIN_PORT || 56121);
const LOGIN_CALLBACK_HOST = "127.0.0.1";
const REDIRECT_URI = `http://${LOGIN_CALLBACK_HOST}:${LOGIN_CALLBACK_PORT}/callback`;

const ISSUER = "https://auth.x.ai";
const DISCOVERY_URL = `${ISSUER}/.well-known/openid-configuration`;
const CLIENT_ID = "b1a00492-073a-47ea-816f-4c329264a828";
const SCOPES = "openid profile email offline_access grok-cli:access api:access";
const GROK_SCOPE = `${ISSUER}::${CLIENT_ID}`;

type GrokModelConfig = {
  id: string;
  name: string;
  reasoning: false;
  input: ["text"];
  contextWindow: number;
  maxTokens: number;
  description?: string;
  baseUrl?: string;
};

type GrokAuth = {
  access: string;
  refresh?: string;
  expires: number;
};

const FALLBACK_MODELS: GrokModelConfig[] = [
  {
    id: "grok-build",
    name: "Grok Build",
    reasoning: false,
    input: ["text"],
    contextWindow: 512_000,
    maxTokens: 16_384,
    description: "Grok Build coding model from the Grok CLI proxy.",
  },
  {
    id: "grok-composer-2.5-fast",
    name: "Composer 2.5 Fast",
    reasoning: false,
    input: ["text"],
    contextWindow: 200_000,
    maxTokens: 16_384,
    description: "Fast composer model from the Grok CLI proxy.",
  },
];

function grokFile(name: string): string {
  return join(homedir(), ".grok", name);
}

function readJsonFile(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

function asString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function asPositiveInteger(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function sanitizeBaseUrl(raw: unknown): string | undefined {
  const value = asString(raw);
  if (!value) return undefined;

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const allowed = host === "grok.com" || host.endsWith(".grok.com") || host === "x.ai" || host.endsWith(".x.ai");
    if (url.protocol !== "https:" || !allowed) return undefined;
    return value.replace(/\/+$/, "");
  } catch {
    return undefined;
  }
}

function readGrokCliVersion(): string {
  try {
    const data = readJsonFile(grokFile("version.json")) as Record<string, unknown>;
    return asString(data.version) || DEFAULT_CLI_VERSION;
  } catch {
    return DEFAULT_CLI_VERSION;
  }
}

function readGrokModels(): GrokModelConfig[] {
  try {
    const data = readJsonFile(grokFile("models_cache.json")) as { models?: Record<string, unknown> };
    const entries = Object.entries(data.models || {});
    const models = entries.flatMap(([key, value]) => {
      const info = ((value as { info?: Record<string, unknown> })?.info || {}) as Record<string, unknown>;
      if (info.hidden === true || info.supported_in_api === false) return [];

      const id = asString(info.model) || key.trim();
      if (!id) return [];

      return [
        {
          id,
          name: asString(info.name) || id,
          reasoning: false as const,
          input: ["text"] as ["text"],
          contextWindow: asPositiveInteger(info.context_window, 128_000),
          maxTokens: asPositiveInteger(info.max_completion_tokens, 16_384),
          description: asString(info.description),
          baseUrl: sanitizeBaseUrl(info.base_url),
        },
      ];
    });

    return models.length ? models : FALLBACK_MODELS;
  } catch {
    return FALLBACK_MODELS;
  }
}

function readGrokAuth(): GrokAuth {
  const authPath = grokFile("auth.json");
  const data = readJsonFile(authPath) as Record<string, Record<string, unknown> | undefined>;
  const entry = data[GROK_SCOPE] || data["https://accounts.x.ai/sign-in"];
  const access = asString(entry?.key) || asString(entry?.access_token) || asString(entry?.access);
  if (!access) throw new Error(`No Grok login found in ${authPath}. Run: grok login`);

  const refresh = asString(entry?.refresh_token) || asString(entry?.refresh);
  const expiresAt = asString(entry?.expires_at) ? Date.parse(String(entry?.expires_at)) : Number(entry?.expires);

  return {
    access,
    refresh,
    expires: Number.isFinite(expiresAt) ? expiresAt : Date.now() + 60 * 60 * 1000,
  };
}

function readGrokApiKeyForStartup(): string | undefined {
  try {
    return readGrokAuth().access;
  } catch {
    return undefined;
  }
}

function base64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64url");
}

async function pkce(): Promise<{ verifier: string; challenge: string }> {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const verifier = base64Url(bytes);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return { verifier, challenge: base64Url(new Uint8Array(digest)) };
}

function validateXaiEndpoint(raw: unknown, field: string): string {
  const value = asString(raw);
  if (!value) throw new Error(`xAI OIDC discovery did not include ${field}`);

  const url = new URL(value);
  if (url.protocol !== "https:" || !(url.hostname === "x.ai" || url.hostname.endsWith(".x.ai"))) {
    throw new Error(`xAI OIDC discovery returned invalid ${field}: ${value}`);
  }
  return value;
}

async function discovery(): Promise<{ authorization_endpoint: string; token_endpoint: string }> {
  const res = await fetch(DISCOVERY_URL, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`xAI OIDC discovery failed: HTTP ${res.status} ${await res.text()}`);
  const json = (await res.json()) as Record<string, unknown>;
  return {
    authorization_endpoint: validateXaiEndpoint(json.authorization_endpoint, "authorization_endpoint"),
    token_endpoint: validateXaiEndpoint(json.token_endpoint, "token_endpoint"),
  };
}

async function exchange(tokenEndpoint: string, data: Record<string, string>): Promise<Record<string, unknown>> {
  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams(data).toString(),
  });
  if (!res.ok) throw new Error(`xAI token request failed: HTTP ${res.status} ${await res.text()}`);
  return (await res.json()) as Record<string, unknown>;
}

function waitForLoopbackCallback(expectedState: string): Promise<{ url: URL; close: () => void }> {
  let server: Server | undefined;
  const close = () => {
    try {
      server?.close();
    } catch {}
  };

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      close();
      reject(new Error(`Timed out waiting for xAI OAuth callback on ${REDIRECT_URI}`));
    }, 15 * 60 * 1000);

    server = createServer((req, res) => {
      const requestUrl = new URL(req.url || "/", REDIRECT_URI);
      if (requestUrl.pathname !== "/callback") {
        res.writeHead(404).end("Not found");
        return;
      }

      const state = requestUrl.searchParams.get("state");
      const code = requestUrl.searchParams.get("code");
      const error = requestUrl.searchParams.get("error");
      const ok = state === expectedState && Boolean(code || error);

      res.writeHead(ok ? 200 : 400, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        ok
          ? "<html><body><h1>xAI authorization received.</h1><p>You can close this tab and return to Pi.</p></body></html>"
          : "<html><body><h1>xAI authorization failed.</h1><p>State mismatch or missing code.</p></body></html>",
      );

      if (ok) {
        clearTimeout(timeout);
        resolve({ url: requestUrl, close });
      }
    });

    server.once("error", (err) => {
      clearTimeout(timeout);
      close();
      reject(err);
    });

    server.listen(LOGIN_CALLBACK_PORT, LOGIN_CALLBACK_HOST);
  });
}

async function login(callbacks: OAuthLoginCallbacks): Promise<OAuthCredentials> {
  try {
    const existing = readGrokAuth();
    callbacks.onDeviceCode({ userCode: "already logged in", verificationUri: "grok login" });
    return {
      access: existing.access,
      refresh: existing.refresh || existing.access,
      expires: existing.expires,
    };
  } catch {
    // Browser PKCE fallback for hosts where `grok login` has not been run yet.
  }

  const endpoints = await discovery();
  const { verifier, challenge } = await pkce();
  const state = crypto.randomUUID().replace(/-/g, "");
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const authUrl = `${endpoints.authorization_endpoint}?${new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
    nonce,
    plan: "generic",
    referrer: "pi-coding-agent",
  }).toString()}`;

  const callbackPromise = waitForLoopbackCallback(state).catch(async (_err) => {
    const callbackUrlText = await callbacks.onPrompt({
      message: "Paste the full 127.0.0.1 callback URL from the browser tab:",
    });
    return { url: new URL(callbackUrlText.trim()), close: () => {} };
  });

  callbacks.onAuth({ url: authUrl });
  const callback = await callbackPromise;
  callback.close();
  const url = callback.url;

  const upstreamError = url.searchParams.get("error");
  if (upstreamError) throw new Error(`xAI OAuth failed: ${upstreamError} ${url.searchParams.get("error_description") || ""}`.trim());
  if (url.searchParams.get("state") !== state) throw new Error("xAI OAuth state mismatch");

  const code = url.searchParams.get("code");
  if (!code) throw new Error(`xAI OAuth callback did not include a code: ${url.toString()}`);

  const payload = await exchange(endpoints.token_endpoint, {
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    code_verifier: verifier,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  const access = asString(payload.access_token);
  const refresh = asString(payload.refresh_token);
  if (!access || !refresh) throw new Error("xAI token response missing access_token or refresh_token");

  return {
    access,
    refresh,
    expires: Date.now() + asPositiveInteger(payload.expires_in, 3600) * 1000,
  };
}

async function refreshToken(credentials: OAuthCredentials): Promise<OAuthCredentials> {
  try {
    const existing = readGrokAuth();
    return {
      access: existing.access,
      refresh: existing.refresh || credentials.refresh,
      expires: existing.expires,
    };
  } catch {
    // Fall through to direct OAuth refresh.
  }

  const endpoints = await discovery();
  const payload = await exchange(endpoints.token_endpoint, {
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    refresh_token: credentials.refresh,
  });

  const access = asString(payload.access_token);
  if (!access) throw new Error("xAI refresh response missing access_token");

  return {
    access,
    refresh: asString(payload.refresh_token) || credentials.refresh,
    expires: Date.now() + asPositiveInteger(payload.expires_in, 3600) * 1000,
  };
}

function registerGrokProvider(pi: ExtensionAPI) {
  const cliVersion = readGrokCliVersion();
  const models = readGrokModels();

  pi.registerProvider(PROVIDER_NAME, {
    name: "Grok CLI (grok login)",
    baseUrl: BASE_URL,
    api: "openai-responses",
    apiKey: readGrokApiKeyForStartup(),
    authHeader: true,
    headers: {
      "X-XAI-Token-Auth": "xai-grok-cli",
      "x-grok-client-version": cliVersion,
    },
    models: models.map((model) => ({
      ...model,
      baseUrl: model.baseUrl || BASE_URL,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
      headers: { "x-grok-model-override": model.id },
      compat: {
        supportsDeveloperRole: false,
        supportsReasoningEffort: false,
        supportsUsageInStreaming: true,
      },
    })),
    oauth: {
      name: "Grok CLI (reuse ~/.grok/auth.json)",
      login,
      refreshToken,
      getApiKey: (credentials) => credentials.access,
    },
  });
}

function statusSummary(): string {
  const authPath = grokFile("auth.json");
  const models = readGrokModels();
  const auth = (() => {
    try {
      const parsed = readGrokAuth();
      return `logged in; token expires ${new Date(parsed.expires).toLocaleString()}`;
    } catch {
      return existsSync(authPath) ? "auth file exists, but no usable Grok token was found" : "not logged in";
    }
  })();

  return [
    `provider: ${PROVIDER_NAME}`,
    `base URL: ${BASE_URL}`,
    `Grok CLI version: ${readGrokCliVersion()}`,
    `auth: ${auth}`,
    `models: ${models.map((m) => m.id).join(", ")}`,
  ].join("\n");
}

export default function (pi: ExtensionAPI) {
  registerGrokProvider(pi);

  pi.registerCommand("grok-status", {
    description: "Show Grok CLI provider status without printing secrets",
    handler: async (_args, ctx) => {
      ctx.ui.notify(statusSummary(), "info");
    },
  });

  pi.registerCommand("grok-refresh", {
    description: "Reload Grok CLI auth, version, and model cache into the provider",
    handler: async (_args, ctx) => {
      pi.unregisterProvider(PROVIDER_NAME);
      registerGrokProvider(pi);
      ctx.ui.notify(`Reloaded ${PROVIDER_NAME}\n${statusSummary()}`, "info");
    },
  });
}
