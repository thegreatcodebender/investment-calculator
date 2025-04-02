import { useRef, useState } from "react";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";
import { useInvestmentState } from "../context/InvestmentContext";
import {
  calculateInvestment,
  calculateInvestmentProgression,
} from "../utils/calculations";
import CalculationCard from "./CalculationCard";
import ResultCard from "./ResultCard";
import SummaryCard from "./SummaryCard";
import LineGraphCard from "./LineGraphCard";

const CalculationsAndResults = () => {
  const [isCalculationCardVisible, setIsCalculationCardVisible] = useState<
    null | boolean
  >(null);
  const calculationCardRef = useRef<HTMLDivElement | null>(null);
  const resultCardRef = useRef<HTMLDivElement | null>(null);
  const investmentState = useInvestmentState();
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const investmentMode = investmentState.mode;
  const inflationRate = investmentState.inflation;
  const calculationResult = calculateInvestment({
    amount: amount.actualValue,
    duration: duration.actualValue,
    interestRate: interest.actualValue,
    investmentMode: investmentMode.title,
    investmentNature: investmentNature.actualValue,
  });
  const resultArr = calculateInvestmentProgression({
    amount: amount.actualValue,
    duration: duration.actualValue,
    interestRate: interest.actualValue,
    investmentMode: investmentMode.title,
    investmentNature: investmentNature.actualValue,
    inflationRate: inflationRate.actualValue,
  });

  const resultTitle =
    investmentMode.title === INVESTMENT_MODES[0].title
      ? `Required ${
          investmentNature.actualValue === INVESTMENT_NATURE_LIST[0].title
            ? INVESTMENT_NATURE_LIST[0].title
            : "One-time"
        } Investment`
      : "Total Future Value";

  /**
   * Handle scroll to required card when summary card is clicked
   */
  const handleClick = () => {
    if (isCalculationCardVisible) {
      if (resultCardRef.current) {
        const { top: cardTop } = resultCardRef.current.getBoundingClientRect();
        window.scrollTo({
          behavior: "auto",
          top: cardTop + window.scrollY - 80,
        });
      }
    } else {
      if (calculationCardRef.current) {
        calculationCardRef.current.scrollIntoView({
          behavior: "auto",
          inline: "start",
        });
      }
    }
  };

  return (
    <>
      <div className="min-lg:flex gap-6 my-4">
        <SummaryCard
          investmentState={investmentState}
          calculationResult={calculationResult}
          resultTitle={resultTitle}
          isCalculationCardVisible={isCalculationCardVisible}
          handleClick={handleClick}
        />
        <CalculationCard
          investmentState={investmentState}
          setIsCalculationCardVisible={setIsCalculationCardVisible}
          cardRef={calculationCardRef}
        />
        <ResultCard
          investmentState={investmentState}
          calculationResult={calculationResult}
          resultTitle={resultTitle}
          cardRef={resultCardRef}
        />
      </div>
      <LineGraphCard resultArr={resultArr} />
    </>
  );
};

export default CalculationsAndResults;
