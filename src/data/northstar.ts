import type { ApInvoice, JobCostLine, Project } from "../domain.js";

export const projects: Project[] = [
  {
    agaveId: "prj_9f4d51b5-downtown-tower",
    sourceId: "NT-2026-014",
    projectCode: "DT-1042",
    name: "Downtown Tower",
    customer: "CivicCore Development",
    status: "active",
    location: "San Francisco, CA",
    startDate: "2026-02-17",
    contractValue: 84200000
  },
  {
    agaveId: "prj_22b8b680-harbor-clinic",
    sourceId: "NT-2026-021",
    projectCode: "HC-8821",
    name: "Harbor Clinic Renovation",
    customer: "Bayview Health",
    status: "active",
    location: "Oakland, CA",
    startDate: "2026-04-03",
    contractValue: 12800000
  },
  {
    agaveId: "prj_73f50e22-redwood-yard",
    sourceId: "NT-2025-119",
    projectCode: "RY-7710",
    name: "Redwood Logistics Yard",
    customer: "North Coast Freight",
    status: "preconstruction",
    location: "Fremont, CA",
    startDate: "2026-09-01",
    contractValue: 27400000
  },
  {
    agaveId: "prj_18c6a4ef-mission-school",
    sourceId: "NT-2024-063",
    projectCode: "MS-4408",
    name: "Mission School Seismic Retrofit",
    customer: "San Francisco Unified School District",
    status: "closed",
    location: "San Francisco, CA",
    startDate: "2025-01-08",
    contractValue: 9600000
  }
];

export const jobCostLines: JobCostLine[] = [
  {
    agaveId: "jcl_001",
    projectAgaveId: "prj_9f4d51b5-downtown-tower",
    costCode: "03-300",
    costCodeName: "Cast-in-Place Concrete",
    costType: "subcontract",
    vendor: "Smith Concrete",
    budget: 6200000,
    committedCost: 5940000,
    actualCost: 4385000,
    forecastCost: 6325000
  },
  {
    agaveId: "jcl_002",
    projectAgaveId: "prj_9f4d51b5-downtown-tower",
    costCode: "05-120",
    costCodeName: "Structural Steel",
    costType: "materials",
    vendor: "Golden Gate Steel",
    budget: 8800000,
    committedCost: 8250000,
    actualCost: 3920000,
    forecastCost: 8610000
  },
  {
    agaveId: "jcl_003",
    projectAgaveId: "prj_9f4d51b5-downtown-tower",
    costCode: "26-010",
    costCodeName: "Electrical Rough-In",
    costType: "subcontract",
    vendor: "BrightLine Electric",
    budget: 4100000,
    committedCost: 3575000,
    actualCost: 990000,
    forecastCost: 3990000
  },
  {
    agaveId: "jcl_004",
    projectAgaveId: "prj_22b8b680-harbor-clinic",
    costCode: "09-290",
    costCodeName: "Gypsum Board Assemblies",
    costType: "subcontract",
    vendor: "West Bay Interiors",
    budget: 640000,
    committedCost: 612000,
    actualCost: 188000,
    forecastCost: 630000
  },
  {
    agaveId: "jcl_005",
    projectAgaveId: "prj_73f50e22-redwood-yard",
    costCode: "31-000",
    costCodeName: "Earthwork",
    costType: "equipment",
    vendor: "Delta Grading",
    budget: 2100000,
    committedCost: 0,
    actualCost: 0,
    forecastCost: 2050000
  }
];

export const apInvoices: ApInvoice[] = [
  {
    agaveId: "api_1001",
    sourceId: "AP-77841",
    projectAgaveId: "prj_9f4d51b5-downtown-tower",
    vendor: "Smith Concrete",
    invoiceNumber: "SC-24019",
    status: "overdue",
    invoiceDate: "2026-05-31",
    dueDate: "2026-06-30",
    amount: 418500,
    paidAmount: 0,
    costCode: "03-300"
  },
  {
    agaveId: "api_1002",
    sourceId: "AP-77912",
    projectAgaveId: "prj_9f4d51b5-downtown-tower",
    vendor: "Smith Concrete",
    invoiceNumber: "SC-24044",
    status: "approved",
    invoiceDate: "2026-06-18",
    dueDate: "2026-07-18",
    amount: 286750,
    paidAmount: 0,
    costCode: "03-300"
  },
  {
    agaveId: "api_1003",
    sourceId: "AP-77788",
    projectAgaveId: "prj_9f4d51b5-downtown-tower",
    vendor: "Golden Gate Steel",
    invoiceNumber: "GGS-6012",
    status: "paid",
    invoiceDate: "2026-05-22",
    dueDate: "2026-06-21",
    amount: 912000,
    paidAmount: 912000,
    costCode: "05-120"
  },
  {
    agaveId: "api_2001",
    sourceId: "AP-78102",
    projectAgaveId: "prj_22b8b680-harbor-clinic",
    vendor: "West Bay Interiors",
    invoiceNumber: "WBI-3310",
    status: "unpaid",
    invoiceDate: "2026-06-25",
    dueDate: "2026-07-25",
    amount: 94000,
    paidAmount: 0,
    costCode: "09-290"
  }
];
