export type CurrencyMap = Record<string, string>;

export interface ConverterResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}
