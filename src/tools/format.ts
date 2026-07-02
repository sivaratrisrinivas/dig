export interface ToolResult {
  summary: string;
  data: unknown;
}

export function toMcpText(result: ToolResult): string {
  return `${result.summary}\n\n\`\`\`json\n${JSON.stringify(result.data, null, 2)}\n\`\`\``;
}

export function money(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}
