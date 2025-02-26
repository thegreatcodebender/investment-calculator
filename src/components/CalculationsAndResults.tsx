import { useState } from "react";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";
import { useInvestmentState } from "../context/InvestmentContext";
import { calculateInvestment } from "../utils/calculations";
import CalculationCard from "./CalculationCard";
import ResultCard from "./ResultCard";
import SummaryCard from "./SummaryCard";

const CalculationsAndResults = () => {
  const [isCalculationCardVisible, setIsCalculationCardVisible] =
    useState(false);
  const investmentState = useInvestmentState();
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const investmentMode = investmentState.mode;
  const calculationResult = calculateInvestment({
    amount: amount.actualValue,
    duration: duration.actualValue,
    interestRate: interest.actualValue,
    investmentMode: investmentMode.title,
    investmentNature: investmentNature.actualValue,
  });
  const resultTitle =
    investmentMode.title === INVESTMENT_MODES[0].title
      ? `Required ${
          investmentNature.actualValue === INVESTMENT_NATURE_LIST[0].title
            ? INVESTMENT_NATURE_LIST[0].title
            : "One-time"
        } Investment`
      : "Total Future Value";
  return (
    <>
      <SummaryCard
        investmentState={investmentState}
        calculationResult={calculationResult}
        resultTitle={resultTitle}
        isCalculationCardVisible={isCalculationCardVisible}
      />
      <CalculationCard
        investmentState={investmentState}
        setIsCalculationCardVisible={setIsCalculationCardVisible}
      />
      <ResultCard
        investmentState={investmentState}
        calculationResult={calculationResult}
        resultTitle={resultTitle}
      />
    </>
  );
};

export default CalculationsAndResults;
