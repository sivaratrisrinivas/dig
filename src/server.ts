#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { MockAgaveClient } from "./agave/agaveClient.js";
import { getApInvoicesSchema, getApInvoicesText } from "./tools/getApInvoices.js";
import { getJobCostsSchema, getJobCostsText } from "./tools/getJobCosts.js";
import { searchProjectsSchema, searchProjectsText } from "./tools/searchProjects.js";

const handle = serveStdio(() => {
  const client = new MockAgaveClient();

  const server = new McpServer({
    name: "dig",
    version: "0.1.0"
  });

  server.registerTool(
    "search_projects",
    {
      title: "Search Projects",
      description: "Find Northstar Builders projects by project name, code, customer, location, or status.",
      inputSchema: searchProjectsSchema,
      annotations: { readOnlyHint: true }
    },
    async (input) => ({
      content: [{ type: "text", text: await searchProjectsText(client, input) }]
    })
  );

  server.registerTool(
    "get_job_costs",
    {
      title: "Get Job Costs",
      description: "Summarize budget, committed cost, actual cost, remaining cost, and forecast variance for a project.",
      inputSchema: getJobCostsSchema,
      annotations: { readOnlyHint: true }
    },
    async (input) => ({
      content: [{ type: "text", text: await getJobCostsText(client, input) }]
    })
  );

  server.registerTool(
    "get_ap_invoices",
    {
      title: "Get AP Invoices",
      description: "List AP invoices by project, vendor, or invoice status.",
      inputSchema: getApInvoicesSchema,
      annotations: { readOnlyHint: true }
    },
    async (input) => ({
      content: [{ type: "text", text: await getApInvoicesText(client, input) }]
    })
  );

  return server;
});

console.error("dig MCP server listening on stdio");

process.once("SIGINT", () => {
  void handle.close();
});

process.once("SIGTERM", () => {
  void handle.close();
});
