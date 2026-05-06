import tb2 from "../data/benchmarks/tb2.json";

export interface BenchmarkRow {
  agent: "lenos" | "codex" | "forgecode";
  model: string;
  provider: string;
  tasks_solved: number;
  tokens_input: number;
  tokens_output: number;
  wall_seconds: number;
  cost_usd: number;
}

export interface BenchmarkData {
  generated_at: string;
  harness_version: string;
  harness_repo: string;
  tasks_total: number;
  is_placeholder: boolean;
  rows: BenchmarkRow[];
}

export const benchmarks: BenchmarkData = tb2 as BenchmarkData;

/** Format a token count with thousands separators. */
export function formatTokens(n: number): string {
  return n.toLocaleString("en-US");
}

/** Format wall-clock seconds as HH:MM:SS. */
export function formatWall(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => n.toString().padStart(2, "0")).join(":");
}

/** Format USD with two decimals and a leading dollar sign. */
export function formatCost(usd: number): string {
  return `$${usd.toFixed(2)}`;
}
