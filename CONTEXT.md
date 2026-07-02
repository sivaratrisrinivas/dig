# Dig

Dig is an MCP-based construction finance agent interface inspired by the Agave Agent Builder prototype idea. This context defines the product language used while shaping and building Dig.

## Language

**Dig**:
The product being built in this repository: an MCP agent interface for querying construction finance data through Agave-style APIs.
_Avoid_: Agave MCP Agent Builder Plugin, generic chatbot

**Local MCP Server**:
Dig v1's product shape: a local MCP server that runs on the user's machine and exposes construction finance tools to MCP clients such as Claude Desktop, Cursor, or similar agent interfaces.
_Avoid_: Hosted Agent Builder service, multi-tenant SaaS

**Agave-Compatible Data Layer**:
Dig v1's initial data source: a mock data layer that behaves like the Agave API for core construction finance objects while preserving a clean boundary for a future real Agave adapter.
_Avoid_: Hardcoded demo script, real-only sandbox integration

**Project Search**:
An MCP tool capability that finds construction projects by business-facing criteria such as name, status, customer, or project code.
_Avoid_: Generic database search, raw project endpoint

**Job Costs**:
An MCP tool capability that explains a project's financial position through budget, committed cost, actual cost, variance, and remaining cost.
_Avoid_: Ledger dump, raw cost rows

**AP Invoices**:
An MCP tool capability that lists accounts payable invoices by project, vendor, or payment status.
_Avoid_: Bill search, generic invoice lookup

**Read-Only Query**:
Dig v1's safety boundary: every MCP tool retrieves or summarizes construction finance data without creating, approving, updating, deleting, uploading, or syncing records.
_Avoid_: Approval action, writeback, autonomous workflow

**Northstar Builders**:
Dig v1's fictional demo contractor, used to provide realistic construction finance data across projects, vendors, cost codes, and AP invoices.
_Avoid_: Placeholder company, generic sample tenant

**Downtown Tower**:
The primary Dig v1 demo project, designed to show meaningful financial risk signals such as tight remaining cost, aging unpaid invoices, and vendor-specific cost pressure.
_Avoid_: Toy project, generic project A

**LLM-Ready Result**:
Dig v1's tool response shape: a concise human-readable summary paired with structured JSON that preserves the underlying construction finance data.
_Avoid_: Raw JSON only, prose-only answer
