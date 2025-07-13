import { CurrencyLocales } from "./currencyContext";

export interface InputAndActualValue {
  inputValue: number | string;
  actualValue: number;
}

interface Amount extends InputAndActualValue {
  prevModeAmount: number;
}

interface Duration extends InputAndActualValue {
  prevModeDuration: number;
}

interface InterestRate extends InputAndActualValue {
  prevModeInterestRate: number;
}

interface InvestmentNature {
  actualValue: string;
  prevModeInvestmentNature: string;
}

interface Mode {
  title: string;
  shortName: string;
  defaultAmount: number;
  currencyLocale?: CurrencyLocales;
}

export interface State {
  amount: Amount;
  duration: Duration;
  interestRate: InterestRate;
  investmentNature: InvestmentNature;
  age: InputAndActualValue;
  mode: Mode;
  inflation: InputAndActualValue;
}

export interface Action {
  type: ActionType;
  payload: any;
}

export enum ActionType {
  Amount = "SET_AMOUNT",
  Duration = "SET_DURATION",
  InterestRate = "SET_INTEREST_RATE",
  InvestmentNature = "SET_INVESTMENT_NATURE",
  Age = "SET_AGE",
  Mode = "SET_MODE",
  Inflation = "SET_INFLATION",
  LocaleAmountInflation = "SET_AMOUNT_LOCALE_INFLATION",
}
