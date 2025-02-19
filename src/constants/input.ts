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
  },
  DURATION: {
    min: 1,
    max: 60,
    step: 1,
    id: "duration-input",
    label: "Investment Timeline",
  },
  INTEREST_RATE: {
    min: 1,
    max: 20,
    step: 0.01,
    id: "interest-input",
    label: "Expected Annual Return",
  },
};

export const INPUT_FIELD_METADATA = {
  AGE: {
    min: 1,
    max: 100,
    id: "current-age",
    default: -1,
    label: "Your Current Age (optional)",
  },
  INFLATION: {
    min: 1,
    max: 10,
    id: "inflation-rate",
    default: -1,
    label: "Expected Inflation Rate",
  },
};
