import * as z from "zod/v4";
import type { AgaveClient } from "../agave/agaveClient.js";
import { toMcpText, type ToolResult } from "./format.js";

export const searchProjectsSchema = z.object({
  query: z.string().optional().describe("Project name, project code, customer, source ID, or location to search for."),
  status: z.enum(["active", "preconstruction", "closed"]).optional().describe("Optional project status filter.")
});

export const searchProjectsObjectSchema = searchProjectsSchema;

export async function searchProjectsTool(
  client: AgaveClient,
  input: z.infer<typeof searchProjectsObjectSchema>
): Promise<ToolResult> {
  const projects = await client.searchProjects(input);
  const summary = projects.length === 0
    ? "No projects matched those filters."
    : `Found ${projects.length} project${projects.length === 1 ? "" : "s"}: ${projects
        .map((project) => `${project.name} (${project.projectCode}, ${project.status})`)
        .join("; ")}.`;

  return { summary, data: { projects } };
}

export async function searchProjectsText(client: AgaveClient, input: z.infer<typeof searchProjectsObjectSchema>): Promise<string> {
  return toMcpText(await searchProjectsTool(client, input));
}
