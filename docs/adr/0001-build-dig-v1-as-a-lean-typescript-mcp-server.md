# Build Dig v1 as a lean TypeScript MCP server

Dig v1 will use TypeScript, Node.js, the official MCP TypeScript SDK v2 server package (`@modelcontextprotocol/server`), Zod v4, and Vitest. We are deliberately deferring React, Postgres, Redis, and AWS until the local read-only MCP value is proven, because the first goal is a credible construction finance agent demo rather than a hosted application platform.
