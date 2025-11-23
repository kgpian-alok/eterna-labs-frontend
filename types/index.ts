export type TokenColumn = "New pairs" | "Final Stretch" | "Migrated";
export type SortDirection = "ascending" | "descending" | null;
export type SortKey = "marketCap" | "price" | "volume24h" | "change24h";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  column: TokenColumn;
  history: number[];
  liquidity: number;
  holders: number;
  transactions24h: number;
}

export interface Particle {
  left: number;
  top: number;
  delay: number;
  duration: number;
}