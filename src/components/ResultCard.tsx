import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Card from "./Card";
import { RupeeIcon } from "./Icons";
import { Button } from "./Button";
import { calculateInflationAdjustedValue } from "../utils/calculations";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";
import { amountINRWithComma } from "../utils/display";
import useInvestmentParams from "../hooks/useInvestmentParams";
import { copyToClipboard } from "../utils/nativeActions";
import { useState } from "react";
import Tooltip from "./Tooltip";
import { INFLATION_ADJUSTED_VALUE_TOOLTIP } from "../constants/result";
import { ResultCardProps } from "../types/card";
import GenerateImageButton from "./GenerateImageButton";

const ResultCard = ({
  investmentState,
  calculationResult,
  cardRef,
}: ResultCardProps) => {
  const [copyBtnText, setCopyBtnText] = useState("Copy Link");
  const { getShareableLink } = useInvestmentParams();
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const investmentNature = investmentState.investmentNature;
  const age = investmentState.age;
  const investmentMode = investmentState.mode;
  const inflation = investmentState.inflation;
  const {
    contribution,
    totalInvestment,
    totalInterest,
    investmentAndInterestTotal,
  } = calculationResult;
  const isGoalSelected = investmentMode.title === INVESTMENT_MODES[0].title;
  const isMonthlySelected =
    investmentNature.actualValue === INVESTMENT_NATURE_LIST[0].title;
  // Get contribution value when it is available
  const resultCommaSeperated = amountINRWithComma(
    contribution === -1 ? investmentAndInterestTotal : contribution
  );
  // Result title to be shown according to the contribution type and investment nature
  const resultTitle = isGoalSelected
    ? `Required ${
        isMonthlySelected ? INVESTMENT_NATURE_LIST[0].title : "One-time"
      } Investment`
    : "Total Future Value";
  // Projected age if age is provided
  const projectedAge =
    age.actualValue !== -1 ? age.actualValue + duration.actualValue : -1;
  const pieData = [
    {
      title: "Total Amount Invested",
      value: isGoalSelected
        ? isMonthlySelected
          ? totalInvestment
          : contribution
        : totalInvestment,
      valueCommaSeperated: amountINRWithComma(
        isGoalSelected
          ? isMonthlySelected
            ? totalInvestment
            : contribution
          : totalInvestment
      ),
      fill: "var(--color-accent-green)",
    },
    {
      title: "Total Returns",
      value: totalInterest,
      valueCommaSeperated: amountINRWithComma(totalInterest),
      fill: "var(--color-accent-purple)",
    },
  ];

  const inflationAdjustedValue = calculateInflationAdjustedValue({
    futureValue:
      investmentMode.title === INVESTMENT_MODES[1].title
        ? investmentAndInterestTotal
        : amount.actualValue,
    inflationRate: inflation.actualValue,
    duration: duration.actualValue,
  });

  const inflationAdjustedCommaSeperated = amountINRWithComma(
    inflationAdjustedValue
  );

  let copyTextChangeTimeoutId: null | NodeJS.Timeout = null;
  /**
   * Copy the shareable link to clipboard and show copied text for a short period
   */
  const handleCopyLink = async () => {
    const isCopied = await copyToClipboard(getShareableLink());
    if (isCopied) {
      setCopyBtnText("Copied!");
    }
    if (copyTextChangeTimeoutId) {
      clearTimeout(copyTextChangeTimeoutId);
    }
    copyTextChangeTimeoutId = setTimeout(() => {
      setCopyBtnText("Copy Link");
    }, 2000);
  };

  return (
    <Card
      className="w-full min-lg:w-[40%] max-lg:mt-8 px-0 flex flex-col justify-between"
      bgColor="bg-primary-light"
      cardRef={cardRef}
    >
      {/* For screen readers accessibility */}
      <p className="sr-only">Calculation results</p>
      {/* Pie Chart */}
      <div className="overflow-x-clip">
        <div className="h-[175px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey={"value"}
                nameKey={"title"}
                outerRadius={80}
                innerRadius={50}
                fill="var(--color-accent-green)"
                cx="50%"
                cy="50%"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="items-center justify-center mt-8 px-8 sm:ms-12 pt-4 mb-12">
          {pieData.map((pie) => (
            <div key={pie.title} className="not-last:mb-6">
              <p className="flex gap-2 items-center leading-none">
                <span
                  className="w-[20px] h-[20px] rounded-sm block"
                  style={{ backgroundColor: `${pie.fill}` }}
                ></span>
                <span>{pie.title}</span>
              </p>
              <p className="ps-7 flex gap-0.25 mt-2 items-center leading-none text-lg font-semibold">
                <RupeeIcon className="h-3.25" />
                {pie.valueCommaSeperated}
              </p>
            </div>
          ))}
        </div>
        {/* Main result */}
        <div className="px-8 py-5 bg-white shadow-md">
          <h2 className="text-lg font-medium mb-2 min-sm:leading-none">
            {resultTitle}
          </h2>
          <p className="text-2xl font-semibold flex gap-0.5 mt-2 items-center leading-none">
            <RupeeIcon className="h-[18px]" />
            {resultCommaSeperated}
          </p>
          {/* Inflation projection*/}
          <p className="text-sm font-normal flex flex-wrap mt-4 opacity-80 items-center">
            Inflation-Adjusted {isGoalSelected && "(Goal)"}
            <Tooltip tooltipContent={INFLATION_ADJUSTED_VALUE_TOOLTIP} />
          </p>
          <p className="opacity-80 mt-1 text-md flex gap-0.75 font-semibold items-center leading-none">
            <RupeeIcon className="h-[12px]" />
            {inflationAdjustedCommaSeperated}
          </p>
        </div>
        {/* Sub text */}
        {projectedAge !== -1 &&
          (isGoalSelected ? (
            <p className="px-8 text-xs mt-4">
              You will achieve your goal at the age of{" "}
              <span className="font-semibold">{projectedAge.toFixed(0)}</span>{" "}
              if you start investing now!
            </p>
          ) : (
            <p className="px-8 text-xs mt-4">
              Your investment will achieve the expected growth at the age of{" "}
              <span className="font-semibold">{projectedAge.toFixed(0)}</span>{" "}
              if you start now!
            </p>
          ))}
      </div>
      {/* Action buttons */}
      <div className="flex flex-col items-center mt-6">
        <h3 className="mb-3 text-sm uppercase font-semibold inline-block leading-none">
          Share your investment plan
        </h3>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <GenerateImageButton
            pieData={pieData}
            investmentState={investmentState}
            calculationResult={calculationResult}
            resultTitle={resultTitle}
            inflationAdjustedValue={inflationAdjustedValue}
            isGoalSelected={isGoalSelected}
          />
          <Button btnType="primary" onClick={handleCopyLink}>
            {copyBtnText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ResultCard;
