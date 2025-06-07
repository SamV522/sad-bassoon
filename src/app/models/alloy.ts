export interface Alloy {
  name: string;
  metals: Record<string, { min: number; max: number }>;
}
