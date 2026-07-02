export type ProjectStatus = "active" | "preconstruction" | "closed";

export type InvoiceStatus = "draft" | "approved" | "paid" | "unpaid" | "overdue";

export interface Project {
  agaveId: string;
  sourceId: string;
  projectCode: string;
  name: string;
  customer: string;
  status: ProjectStatus;
  location: string;
  startDate: string;
  contractValue: number;
}

export interface JobCostLine {
  agaveId: string;
  projectAgaveId: string;
  costCode: string;
  costCodeName: string;
  costType: "labor" | "materials" | "subcontract" | "equipment" | "other";
  vendor?: string;
  budget: number;
  committedCost: number;
  actualCost: number;
  forecastCost: number;
}

export interface ApInvoice {
  agaveId: string;
  sourceId: string;
  projectAgaveId: string;
  vendor: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  costCode: string;
}

export interface JobCostSummary {
  project: Project;
  lines: JobCostLine[];
  totals: {
    budget: number;
    committedCost: number;
    actualCost: number;
    forecastCost: number;
    remainingCost: number;
    variance: number;
  };
}

export interface ApInvoiceSearchResult {
  project?: Project;
  invoices: ApInvoice[];
  totals: {
    amount: number;
    paidAmount: number;
    outstandingAmount: number;
  };
}
