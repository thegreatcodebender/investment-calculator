import { INVESTMENT_MODES } from "./investment";

export const SLIDER_INPUT_METADATA = {
  AMOUNT: {
    min: 1000,
    max: 10000000,
    step: 500,
    id: "amount-input",
    label: {
      [INVESTMENT_MODES[0].title]: "Goal Amount",
      [INVESTMENT_MODES[1].title]: "Investment Amount",
    },
    tooltip: {
      [INVESTMENT_MODES[0].title]: "Amount you want to achieve with investment",
      [INVESTMENT_MODES[1].title]:
        "Amount you are willing to invest periodically (Monthly or One-time)",
    },
  },
  DURATION: {
    min: 1,
    max: 60,
    step: 1,
    id: "duration-input",
    label: "Investment Timeline",
    tooltip: "Number of years you want to invest",
  },
  INTEREST_RATE: {
    min: 1,
    max: 20,
    step: 0.01,
    id: "interest-input",
    label: "Expected Annual Return",
    tooltip: "Annual rate of investment growth",
  },
};

export const INPUT_FIELD_METADATA = {
  AGE: {
    min: 1,
    max: 100,
    id: "current-age",
    default: -1,
    label: "Your Current Age (optional)",
    tooltip: "Project your investment insights from your age",
  },
  INFLATION: {
    min: 1,
    max: 10,
    id: "inflation-rate",
    default: -1,
    label: "Expected Inflation Rate",
    tooltip: "Average inflation rate for the past 5 years: 5.7%",
  },
};
