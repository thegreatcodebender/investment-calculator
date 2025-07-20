import { Ref } from "react";
import { CalculationResult, InvestmentState } from "./investmentState";

export interface CardProps {
  bgColor?: string;
  className?: string;
  cardRef?: Ref<HTMLDivElement>;
  ariaHidden?: boolean;
  ariaLabelledBy?: string;
}

export interface ResultCardProps extends InvestmentState {
  calculationResult: CalculationResult;
  resultTitle: string;
  cardRef?: Ref<HTMLDivElement>;
}

export interface CalculationCardProps extends InvestmentState {
  cardRef: Ref<HTMLDivElement>;
}

export interface SummaryCardProps extends ResultCardProps {
  calculationCardRef: React.MutableRefObject<HTMLDivElement | null>;
  resultCardRef: React.MutableRefObject<HTMLDivElement | null>;
}

export interface SummaryCardContainerProps {
  position: "bottom" | "top";
  isVisible: boolean;
  handleClick: () => void;
}
