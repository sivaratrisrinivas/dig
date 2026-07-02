# Dig

Dig is a local MCP server for querying construction finance data through an Agave-compatible interface. The v1 prototype is read-only and ships with a realistic fictional contractor dataset for Northstar Builders.

## Tools

- `search_projects` - find projects by name, project code, customer, or status.
- `get_job_costs` - summarize budget, committed cost, actual cost, remaining cost, and variance for a project.
- `get_ap_invoices` - list AP invoices by project, vendor, or status.

Each tool returns an LLM-ready summary followed by structured JSON so the result is useful in chat and inspectable in tests.

## Quick Start

```bash
npm install
npm run build
npm start
```

For local development:

```bash
npm run dev
npm test
```

## Claude Desktop

After building, add Dig to your Claude Desktop MCP config:

```json
{
  "mcpServers": {
    "dig": {
      "command": "node",
      "args": ["/absolute/path/to/dig/dist/src/server.js"]
    }
  }
}
```

## Demo Prompts

- "Find the Downtown Tower project."
- "Show the job costs for Downtown Tower, especially concrete."
- "List unpaid AP invoices for Smith Concrete on Downtown Tower."
