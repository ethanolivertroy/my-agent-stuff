Web search and fetch tools for the [pi](https://github.com/mariozechner/pi-coding-agent/) coding agent. Uses your local Ollama instance's web search and fetch APIs.

## Features

- **`ollama_web_search`** - Search the web for real-time information
- **`ollama_web_fetch`** - Fetch and extract content from web pages


## Requirements

- pi coding agent installed
- Ollama running locally

## Installation

### From npm

```bash
pi install npm:@ollama/pi-web-search
```
```

### From GitHub

```bash
pi install git:github.com/ollama/pi-web-search
```

### From local path (development)

```bash
pi install /path/to/pi-web-search
```

### Try without installing

```bash
pi -e git:github.com/ollama/pi-web-search
```


The LLM can then use:
- `ollama_web_search` - When you need to search for current information
- `ollama_web_fetch` - When you need to extract content from a specific URL

## Troubleshooting

If you get connection errors:
1. Make sure Ollama is running (`ollama serve`)
2. Verify web search/fetch is enabled in your Ollama configuration
3. Check the OLLAMA_HOST environment variable matches your setup

## License

MIT
