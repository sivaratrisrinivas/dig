import { describe, expect, it } from "vitest";
import { MockAgaveClient } from "../src/agave/agaveClient.js";
import { getApInvoicesTool } from "../src/tools/getApInvoices.js";
import { getJobCostsTool } from "../src/tools/getJobCosts.js";
import { searchProjectsTool } from "../src/tools/searchProjects.js";

describe("Dig MCP tool behavior", () => {
  const client = new MockAgaveClient();

  it("finds Downtown Tower by project name", async () => {
    const result = await searchProjectsTool(client, { query: "Downtown Tower" });

    expect(result.summary).toContain("Downtown Tower");
    expect(result.data).toMatchObject({
      projects: [
        {
          name: "Downtown Tower",
          projectCode: "DT-1042",
          status: "active"
        }
      ]
    });
  });

  it("summarizes concrete job costs with risk visible in the totals", async () => {
    const result = await getJobCostsTool(client, {
      projectQuery: "Downtown Tower",
      costCode: "concrete"
    });

    expect(result.summary).toContain("forecast over budget");
    expect(result.data).toMatchObject({
      project: { name: "Downtown Tower" },
      lines: [
        {
          costCode: "03-300",
          vendor: "Smith Concrete"
        }
      ],
      totals: {
        budget: 6200000,
        committedCost: 5940000,
        actualCost: 4385000,
        forecastCost: 6325000,
        remainingCost: 260000,
        variance: -125000
      }
    });
  });

  it("lists unpaid Smith Concrete AP exposure on Downtown Tower", async () => {
    const result = await getApInvoicesTool(client, {
      projectQuery: "Downtown Tower",
      vendor: "Smith Concrete"
    });

    expect(result.summary).toContain("$705,250 outstanding");
    expect(result.data).toMatchObject({
      project: { name: "Downtown Tower" },
      totals: {
        amount: 705250,
        paidAmount: 0,
        outstandingAmount: 705250
      }
    });
  });
});
