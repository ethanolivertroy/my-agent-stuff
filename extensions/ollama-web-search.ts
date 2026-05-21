import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";

// Ollama Web Tools for pi
// Provides web_search and web_fetch tools using local Ollama instance

interface SearchResponse {
  results: Array<{
    title: string;
    url: string;
    content: string;
  }>;
}

interface FetchResponse {
  title: string;
  content: string;
  links: string[];
}

function getOllamaHost(): string {
  return "http://localhost:11434";
}

export default function (pi: ExtensionAPI) {
  // web_search tool
  pi.registerTool({
    name: "web_search",
    label: "Web Search",
    description: "Search the web for real-time information using your local Ollama instance's web_search API. Requires Ollama running locally with web search enabled.",
    parameters: Type.Object({
      query: Type.String({ description: "The search query to execute" }),
      max_results: Type.Optional(Type.Number({ description: "Maximum number of search results to return (default: 5)", default: 5 })),
    }),
    async execute(_toolCallId, params, signal, _onUpdate, _ctx) {
      const maxResults = params.max_results ?? 5;
      const host = getOllamaHost();

      try {
        const response = await fetch(`${host}/api/experimental/web_search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: params.query,
            max_results: maxResults,
          }),
          signal,
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Run `ollama signin` to authenticate.");
          }
          const errorText = await response.text().catch(() => "");
          throw new Error(`Search API error (status ${response.status}): ${errorText || response.statusText}`);
        }

        const data = await response.json() as SearchResponse;

        // Format results for LLM
        const formatted = data.results
          .map((r, i) => `${i + 1}. ${r.title}\n   URL: ${r.url}\n   ${r.content}`)
          .join("\n\n");

        return {
          content: [{ type: "text", text: formatted || "No results found." }],
          details: { results: data.results },
        };
      } catch (error) {
        if (error instanceof Error && error.message.includes("ECONNREFUSED")) {
          throw new Error(`Could not connect to Ollama at ${host}. Make sure Ollama is running and web_search is enabled.`);
        }
        throw error;
      }
    },
  });

  // web_fetch tool
  pi.registerTool({
    name: "web_fetch",
    label: "Web Fetch",
    description: "Fetch and extract text content from a web page URL using your local Ollama instance's web_fetch API. Requires Ollama running locally with web fetch enabled.",
    parameters: Type.Object({
      url: Type.String({ description: "URL to fetch and extract content from" }),
    }),
    async execute(_toolCallId, params, signal, _onUpdate, _ctx) {
      const host = getOllamaHost();

      try {
        const response = await fetch(`${host}/api/experimental/web_fetch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: params.url,
          }),
          signal,
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Run `ollama signin` to authenticate.");
          }
          const errorText = await response.text().catch(() => "");
          throw new Error(`Fetch API error (status ${response.status}): ${errorText || response.statusText}`);
        }

        const data = await response.json() as FetchResponse;

        const formatted = [
          `Title: ${data.title}`,
          "",
          "Content:",
          data.content,
          "",
          `Links found: ${data.links?.length ?? 0}`,
          ...(data.links?.slice(0, 10).map((l) => `  - ${l}`) ?? []),
        ].join("\n");

        return {
          content: [{ type: "text", text: formatted }],
          details: {
            title: data.title,
            content: data.content,
            links: data.links,
          },
        };
      } catch (error) {
        if (error instanceof Error && error.message.includes("ECONNREFUSED")) {
          throw new Error(`Could not connect to Ollama at ${host}. Make sure Ollama is running and web_fetch is enabled.`);
        }
        throw error;
      }
    },
  });
}
