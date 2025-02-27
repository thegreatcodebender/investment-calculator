import { Ref } from "react";
import { CalculationResult, InvestmentState } from "./investmentState";

export interface CardProps {
  bgColor?: string;
  className?: string;
  cardRef?: Ref<HTMLDivElement>;
}

export interface ResultCardProps extends InvestmentState {
  calculationResult: CalculationResult;
  resultTitle: string;
  cardRef?: Ref<HTMLDivElement>;
}

export interface CalculationCardProps extends InvestmentState {
  setIsCalculationCardVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cardRef: Ref<HTMLDivElement>;
}

export interface SummaryCardProps extends ResultCardProps {
  isCalculationCardVisible: boolean;
  handleClick: () => void;
}
