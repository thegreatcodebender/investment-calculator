import { CalculationResult, InvestmentState } from "./investmentState";

export interface CardProps {
  bgColor?: string;
  className?: string;
}

export interface CalculationCardProps extends InvestmentState {
  calculationResult: CalculationResult;
  resultTitle: string;
}
