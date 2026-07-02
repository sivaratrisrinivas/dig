import { z } from "zod/v3";
import type { AgaveClient } from "../agave/agaveClient.js";
import { money, toMcpText, type ToolResult } from "./format.js";

export const getJobCostsSchema = {
  projectId: z.string().optional().describe("Agave project ID or project code."),
  projectQuery: z.string().optional().describe("Project name or customer search text when projectId is unknown."),
  costCode: z.string().optional().describe("Optional cost code or cost code name filter, such as 03-300 or concrete.")
};

export const getJobCostsObjectSchema = z.object(getJobCostsSchema).refine(
  (input) => input.projectId || input.projectQuery,
  "Provide either projectId or projectQuery."
);

export async function getJobCostsTool(
  client: AgaveClient,
  input: z.infer<typeof getJobCostsObjectSchema>
): Promise<ToolResult> {
  const result = await client.getJobCosts(input);
  const { project, totals } = result;
  const variancePhrase = totals.variance < 0
    ? `${money(Math.abs(totals.variance))} forecast over budget`
    : `${money(totals.variance)} forecast under budget`;
  const summary = `${project.name} has ${money(totals.budget)} budgeted, ${money(
    totals.committedCost
  )} committed, ${money(totals.actualCost)} actual cost, and ${money(
    totals.remainingCost
  )} remaining against commitments. Current forecast is ${variancePhrase}.`;

  return { summary, data: result };
}

export async function getJobCostsText(client: AgaveClient, input: z.infer<typeof getJobCostsObjectSchema>): Promise<string> {
  return toMcpText(await getJobCostsTool(client, input));
}
