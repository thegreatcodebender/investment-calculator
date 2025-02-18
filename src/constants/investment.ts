export const INVESTMENT_NATURE_LIST = [
  { title: "Monthly", shortName: "monthly" },
  { title: "Lump Sum (One-time)", shortName: "one-time" },
];
export const INVESTMENT_MODES = [
  { title: "Plan Your Goal", shortName: "target", defaultAmount: 1500000 },
  {
    title: "Project Your Investment",
    shortName: "investment",
    defaultAmount: 1000,
  },
];
export const INVESTMENT_INITIAL_STATE = {
  AMOUNT: 2500000,
  DURATION: 10,
  INTEREST_RATE: 10,
  INVESTMENT_NATURE: INVESTMENT_NATURE_LIST[0].title,
  MODE: INVESTMENT_MODES[0],
  AGE: -1,
};
