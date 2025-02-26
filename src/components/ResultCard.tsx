import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Card from "./Card";
import { RupeeIcon } from "./Icons";
import { Button } from "./Button";
import { useInvestmentState } from "../context/InvestmentContext";
import {
  calculateInflationAdjustedValue,
  calculateInvestment,
} from "../utils/calculations";
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

const ResultCard = () => {
  const [copyBtnText, setCopyBtnText] = useState("Copy Link");
  const { getShareableLink } = useInvestmentParams();
  const investmentState = useInvestmentState();
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const age = investmentState.age;
  const investmentMode = investmentState.mode;
  const inflation = investmentState.inflation;
  const {
    contribution,
    totalInvestment,
    totalInterest,
    investmentAndInterestTotal,
  } = calculateInvestment({
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
  const projectedAge =
    age.actualValue !== -1 ? age.actualValue + duration.actualValue : -1;
  const pieData = [
    {
      title: "Total Amount Invested",
      value:
        investmentMode.title === INVESTMENT_MODES[0].title
          ? investmentNature.actualValue === INVESTMENT_NATURE_LIST[0].title
            ? totalInvestment
            : contribution
          : totalInvestment,
      fill: "var(--color-accent-green)",
    },
    {
      title: "Total Returns",
      value: totalInterest,
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

  let copyTextChangeTimeoutId: null | number = null;
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
                {amountINRWithComma(pie.value)}
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
            {contribution === -1
              ? amountINRWithComma(investmentAndInterestTotal)
              : amountINRWithComma(contribution)}
          </p>
          {/* Inflation projection*/}
          <p className="text-sm font-normal flex flex-wrap mt-4 opacity-80 items-center">
            Inflation-Adjusted Value{" "}
            {investmentMode.title === INVESTMENT_MODES[0].title &&
              "of your goal"}
            <Tooltip
              tooltipContent={INFLATION_ADJUSTED_VALUE_TOOLTIP}
              iconClassName="sm:!ms-1"
            />
          </p>
          <p className="opacity-80 mt-1 text-md flex gap-0.75 font-semibold items-center leading-none">
            <RupeeIcon className="h-[12px]" />
            {amountINRWithComma(inflationAdjustedValue)}
          </p>
        </div>
        {/* Sub text */}
        {projectedAge !== -1 &&
          (investmentMode.title === INVESTMENT_MODES[0].title ? (
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
      {/* Action button */}
      <div className="flex items-center justify-center mt-6">
        <Button btnType="primary" onClick={handleCopyLink}>
          {copyBtnText}
        </Button>
      </div>
    </Card>
  );
};

export default ResultCard;
