import type { ApInvoiceSearchResult, InvoiceStatus, JobCostSummary, Project, ProjectStatus } from "../domain.js";
import { apInvoices, jobCostLines, projects } from "../data/northstar.js";

export interface ProjectSearchParams {
  query?: string;
  status?: ProjectStatus;
}

export interface JobCostParams {
  projectId?: string;
  projectQuery?: string;
  costCode?: string;
}

export interface ApInvoiceParams {
  projectId?: string;
  projectQuery?: string;
  vendor?: string;
  status?: InvoiceStatus;
}

export interface AgaveClient {
  searchProjects(params: ProjectSearchParams): Promise<Project[]>;
  getJobCosts(params: JobCostParams): Promise<JobCostSummary>;
  getApInvoices(params: ApInvoiceParams): Promise<ApInvoiceSearchResult>;
}

export class MockAgaveClient implements AgaveClient {
  async searchProjects(params: ProjectSearchParams): Promise<Project[]> {
    const query = normalize(params.query);

    return projects.filter((project) => {
      const matchesStatus = params.status ? project.status === params.status : true;
      const matchesQuery = query
        ? [project.name, project.projectCode, project.customer, project.location, project.sourceId]
            .some((value) => normalize(value).includes(query))
        : true;

      return matchesStatus && matchesQuery;
    });
  }

  async getJobCosts(params: JobCostParams): Promise<JobCostSummary> {
    const project = await this.resolveProject(params.projectId, params.projectQuery);
    const costCode = normalize(params.costCode);
    const lines = jobCostLines.filter((line) => {
      const matchesProject = line.projectAgaveId === project.agaveId;
      const matchesCostCode = costCode
        ? normalize(line.costCode).includes(costCode) || normalize(line.costCodeName).includes(costCode)
        : true;

      return matchesProject && matchesCostCode;
    });

    const totals = lines.reduce(
      (acc, line) => ({
        budget: acc.budget + line.budget,
        committedCost: acc.committedCost + line.committedCost,
        actualCost: acc.actualCost + line.actualCost,
        forecastCost: acc.forecastCost + line.forecastCost,
        remainingCost: acc.remainingCost + (line.budget - line.committedCost),
        variance: acc.variance + (line.budget - line.forecastCost)
      }),
      {
        budget: 0,
        committedCost: 0,
        actualCost: 0,
        forecastCost: 0,
        remainingCost: 0,
        variance: 0
      }
    );

    return { project, lines, totals };
  }

  async getApInvoices(params: ApInvoiceParams): Promise<ApInvoiceSearchResult> {
    const project = params.projectId || params.projectQuery
      ? await this.resolveProject(params.projectId, params.projectQuery)
      : undefined;
    const vendor = normalize(params.vendor);

    const invoices = apInvoices.filter((invoice) => {
      const matchesProject = project ? invoice.projectAgaveId === project.agaveId : true;
      const matchesVendor = vendor ? normalize(invoice.vendor).includes(vendor) : true;
      const matchesStatus = params.status ? invoice.status === params.status : true;

      return matchesProject && matchesVendor && matchesStatus;
    });

    const totals = invoices.reduce(
      (acc, invoice) => ({
        amount: acc.amount + invoice.amount,
        paidAmount: acc.paidAmount + invoice.paidAmount,
        outstandingAmount: acc.outstandingAmount + (invoice.amount - invoice.paidAmount)
      }),
      {
        amount: 0,
        paidAmount: 0,
        outstandingAmount: 0
      }
    );

    return { project, invoices, totals };
  }

  private async resolveProject(projectId?: string, projectQuery?: string): Promise<Project> {
    if (projectId) {
      const project = projects.find((candidate) => candidate.agaveId === projectId || candidate.projectCode === projectId);
      if (project) {
        return project;
      }
    }

    const matches = await this.searchProjects({ query: projectQuery });
    if (matches.length === 1) {
      return matches[0]!;
    }

    if (matches.length > 1) {
      throw new Error(`Multiple projects matched "${projectQuery}". Use an Agave ID or project code.`);
    }

    throw new Error(`No project matched "${projectId ?? projectQuery ?? "the provided filters"}".`);
  }
}

function normalize(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}
