import { z } from "zod/v3";
import type { AgaveClient } from "../agave/agaveClient.js";
import { money, toMcpText, type ToolResult } from "./format.js";

export const getApInvoicesSchema = {
  projectId: z.string().optional().describe("Agave project ID or project code."),
  projectQuery: z.string().optional().describe("Project name or customer search text when projectId is unknown."),
  vendor: z.string().optional().describe("Vendor name filter."),
  status: z.enum(["draft", "approved", "paid", "unpaid", "overdue"]).optional().describe("Optional AP invoice status filter.")
};

export const getApInvoicesObjectSchema = z.object(getApInvoicesSchema);

export async function getApInvoicesTool(
  client: AgaveClient,
  input: z.infer<typeof getApInvoicesObjectSchema>
): Promise<ToolResult> {
  const result = await client.getApInvoices(input);
  const projectPhrase = result.project ? ` for ${result.project.name}` : "";
  const vendorPhrase = input.vendor ? ` from vendors matching "${input.vendor}"` : "";
  const summary = result.invoices.length === 0
    ? `No AP invoices matched${projectPhrase}${vendorPhrase}.`
    : `Found ${result.invoices.length} AP invoice${result.invoices.length === 1 ? "" : "s"}${projectPhrase}${vendorPhrase}: ${money(
        result.totals.outstandingAmount
      )} outstanding on ${money(result.totals.amount)} total billed.`;

  return { summary, data: result };
}

export async function getApInvoicesText(client: AgaveClient, input: z.infer<typeof getApInvoicesObjectSchema>): Promise<string> {
  return toMcpText(await getApInvoicesTool(client, input));
}
