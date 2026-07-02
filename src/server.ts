#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MockAgaveClient } from "./agave/agaveClient.js";
import { getApInvoicesSchema, getApInvoicesText } from "./tools/getApInvoices.js";
import { getJobCostsSchema, getJobCostsText } from "./tools/getJobCosts.js";
import { searchProjectsSchema, searchProjectsText } from "./tools/searchProjects.js";

const stdioKeepAlive = setInterval(() => undefined, 1 << 30);
process.stdin.resume();

const client = new MockAgaveClient();

const server = new McpServer({
  name: "dig",
  version: "0.1.0"
});

server.tool(
  "search_projects",
  "Find Northstar Builders projects by project name, code, customer, location, or status.",
  searchProjectsSchema,
  async (input) => ({
    content: [{ type: "text", text: await searchProjectsText(client, input) }]
  })
);

server.tool(
  "get_job_costs",
  "Summarize budget, committed cost, actual cost, remaining cost, and forecast variance for a project.",
  getJobCostsSchema,
  async (input) => ({
    content: [{ type: "text", text: await getJobCostsText(client, input) }]
  })
);

server.tool(
  "get_ap_invoices",
  "List AP invoices by project, vendor, or invoice status.",
  getApInvoicesSchema,
  async (input) => ({
    content: [{ type: "text", text: await getApInvoicesText(client, input) }]
  })
);

await server.connect(new StdioServerTransport());

process.once("SIGTERM", () => {
  clearInterval(stdioKeepAlive);
  process.exit(0);
});
