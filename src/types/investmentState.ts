import { State } from "./investmentContext";

export interface InvestmentState {
  investmentState: State;
}

export interface CalculationResult {
  contribution: number;
  totalInvestment: number;
  totalInterest: number;
  investmentAndInterestTotal: number;
}
