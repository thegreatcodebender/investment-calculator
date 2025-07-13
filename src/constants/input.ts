import { CurrencyLocales } from "../types/currencyContext";
import { currencyWithComma } from "../utils/display";
import { CURRENCY } from "./currency";
import { DEFAULT_INVESTMENT_AMOUNT, INVESTMENT_MODES } from "./investment";

export const SLIDER_INPUT_METADATA = {
  AMOUNT: {
    min: (currencyLocale: CurrencyLocales) =>
      currencyLocale === CurrencyLocales.IN ? 1000 : 100,
    max: (currencyLocale: CurrencyLocales) =>
      currencyLocale === CurrencyLocales.IN ? 10000000 : 1000000,
    step: 500,
    id: "amount-input",
    label: {
      [INVESTMENT_MODES[0].title]: "Goal Amount",
      [INVESTMENT_MODES[1].title]: "Investment Amount",
    },
    tooltip: {
      [INVESTMENT_MODES[0].title]: (currencyLocale: CurrencyLocales) =>
        `Enter the total amount you want to achieve (e.g. ${
          CURRENCY[currencyLocale]
        } ${currencyWithComma({
          amount: DEFAULT_INVESTMENT_AMOUNT[0].defaultValues[currencyLocale],
        })})`,
      [INVESTMENT_MODES[1].title]: (currencyLocale: CurrencyLocales) =>
        `Enter the amount you plan to invest (e.g. ${
          CURRENCY[currencyLocale]
        } ${currencyWithComma({
          amount: DEFAULT_INVESTMENT_AMOUNT[1].defaultValues[currencyLocale],
        })})`,
    },
  },
  DURATION: {
    min: 1,
    max: 60,
    step: 1,
    id: "duration-input",
    label: "Investment Timeline",
    tooltip: "Enter the number of years you plan to invest (e.g. 10 years)",
  },
  INTEREST_RATE: {
    min: 1,
    max: 25,
    step: 0.05,
    id: "interest-input",
    label: "Expected Annual Return",
    tooltip: "Enter the expected annual return on your investment (e.g. 8%)",
  },
};

export const INPUT_FIELD_METADATA = {
  AGE: {
    min: 1,
    max: 100,
    id: "current-age",
    default: -1,
    label: "Your Current Age (optional)",
    tooltip: "Enter your current age to see when you’ll reach your goal",
  },
  INFLATION: {
    min: 1,
    max: 10,
    id: "inflation-rate",
    default: -1,
    label: "Expected Inflation Rate",
    tooltip:
      "Enter the expected annual inflation rate. Average inflation rate for the past 5 years: 5.7%",
  },
};
