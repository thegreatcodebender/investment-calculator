import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Card from "./Card";
import { RupeeIcon } from "./Icons";
import { Button } from "./Button";
import { useInvestmentState } from "../context/InvestmentContext";
import { calculateInvestment } from "../utils/calculations";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";
import { amountINRWithComma } from "../utils/display";
import useInvestmentParams from "../hooks/useInvestmentParams";
import { copyToClipboard } from "../utils/nativeActions";
import { useState } from "react";

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
  const {
    contribution,
    totalInvestment,
    totalInterest,
    investmentAndInterestTotal,
  } = calculateInvestment({
    amount,
    duration,
    interestRate: interest,
    investmentMode: investmentMode.title,
    investmentNature,
  });
  const resultTitle =
    investmentMode.title === INVESTMENT_MODES[0].title
      ? `Required ${
          investmentNature === INVESTMENT_NATURE_LIST[0].title
            ? INVESTMENT_NATURE_LIST[0].title
            : "One-time"
        } Contribution`
      : "Total earnings";
  const projectedAge = age !== -1 ? age + duration : -1;
  const pieData = [
    {
      title: "Total Investment",
      value: totalInvestment,
      fill: "var(--color-accent-green)",
    },
    {
      title: "Returns",
      value: totalInterest,
      fill: "var(--color-accent-purple)",
    },
  ];

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
      <div>
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
        <div className="flex flex-wrap gap-6 items-center justify-center mt-11 py-8">
          {pieData.map((pie) => (
            <div key={pie.title}>
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
        <div className="px-8 py-5 bg-white">
          <h2 className="text-lg font-medium mb-2 min-sm:leading-none">
            {resultTitle}
          </h2>
          <p className="text-2xl font-semibold flex gap-0.5 mt-2 items-center leading-none">
            <RupeeIcon className="h-[18px]" />
            {contribution === -1
              ? amountINRWithComma(investmentAndInterestTotal)
              : amountINRWithComma(contribution)}
          </p>
        </div>
        {/* Sub text */}
        {projectedAge !== -1 && (
          <p className="px-8 text-xs mt-4">
            You will achieve your target amount at the age of{" "}
            <span className="font-semibold">{projectedAge}</span> if start
            investing now!
          </p>
        )}
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
