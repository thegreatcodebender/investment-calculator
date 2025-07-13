import { CurrencyLocales } from "../types/currencyContext";

export const DEFAULT_INVESTMENT_AMOUNT = [
  {
    shortName: "target",
    defaultValues: {
      [CurrencyLocales.IN]: 2500000,
      [CurrencyLocales.US]: 100000,
    },
  },
  {
    shortName: "investment",
    defaultValues: {
      [CurrencyLocales.IN]: 10000,
      [CurrencyLocales.US]: 1000,
    },
  },
];
export const DEFAULT_INFLATION_RATES = {
  [CurrencyLocales.IN]: 5.7,
  [CurrencyLocales.US]: 4.18,
};
export const INVESTMENT_MODES = [
  {
    title: "Plan Your Goal",
    shortName: "target",
    defaultAmount:
      DEFAULT_INVESTMENT_AMOUNT[0].defaultValues[CurrencyLocales.IN],
  },
  {
    title: "Calculate Future Value",
    shortName: "investment",
    defaultAmount:
      DEFAULT_INVESTMENT_AMOUNT[1].defaultValues[CurrencyLocales.IN],
  },
];
export const INVESTMENT_NATURE_LIST = [
  { title: "Monthly", shortName: "monthly" },
  { title: "Lump Sum (One-time)", shortName: "one-time" },
];
export const INVESTMENT_NATURE_TOOLTIP =
  "Choose how you’ll invest: monthly contributions or a one-time lump sum";
export const INVESTMENT_INITIAL_STATE = {
  AMOUNT: INVESTMENT_MODES[0].defaultAmount,
  DURATION: 10,
  INTEREST_RATE: 10,
  INVESTMENT_NATURE: INVESTMENT_NATURE_LIST[0].title,
  MODE: INVESTMENT_MODES[0],
  AGE: -1,
  INFLATION: DEFAULT_INFLATION_RATES[CurrencyLocales.IN],
};
