import { PieChartData } from "./chartData";
import { State } from "./investmentContext";
import { CalculationResult } from "./investmentState";

export interface GenerateImageButtonProps extends PieChartData {
  calculationResult: CalculationResult;
  investmentState: State;
  resultTitle: string;
  inflationAdjustedValue: number;
  isGoalSelected: boolean;
}
