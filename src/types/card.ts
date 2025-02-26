import { CalculationResult, InvestmentState } from "./investmentState";

export interface CardProps {
  bgColor?: string;
  className?: string;
}

export interface ResultCardProps extends InvestmentState {
  calculationResult: CalculationResult;
  resultTitle: string;
}

export interface CalculationCardProps extends InvestmentState {
  setIsCalculationCardVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SummaryCardProps extends ResultCardProps {
  isCalculationCardVisible: boolean;
}
