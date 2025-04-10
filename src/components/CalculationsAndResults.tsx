import { useRef } from "react";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";
import { useInvestmentState } from "../context/InvestmentContext";
import { calculateInvestment } from "../utils/calculations";
import CalculationCard from "./CalculationCard";
import ResultCard from "./ResultCard";
import SummaryCard from "./SummaryCard";
import LineGraphCard from "./LineGraphCard";
import { CalculationCardProvider } from "../context/CalculationCardContext";

const CalculationsAndResults = () => {
  const calculationCardRef = useRef<HTMLDivElement | null>(null);
  const resultCardRef = useRef<HTMLDivElement | null>(null);
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
      <div className="min-lg:flex gap-6 my-4">
        <CalculationCardProvider>
          <SummaryCard
            investmentState={investmentState}
            calculationResult={calculationResult}
            resultTitle={resultTitle}
            calculationCardRef={calculationCardRef}
            resultCardRef={resultCardRef}
          />
          <CalculationCard
            investmentState={investmentState}
            cardRef={calculationCardRef}
          />
        </CalculationCardProvider>
        <ResultCard
          investmentState={investmentState}
          calculationResult={calculationResult}
          resultTitle={resultTitle}
          cardRef={resultCardRef}
        />
      </div>
      <LineGraphCard />
    </>
  );
};

export default CalculationsAndResults;
