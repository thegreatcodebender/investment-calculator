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
import Card from "./Card";
import { amountINRWithComma } from "../utils/display";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  console.log(resultArr);

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
      <Card className="max-lg:mt-8 min-w-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={resultArr}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="year" />
            <YAxis dataKey="withInflnAdj" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="withoutInflnAdj" stroke="#82ca9d" />
            <Line
              type="monotone"
              dataKey="withoutInvestment"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="withInflnAdj" stroke="gray" />
            <Line type="monotone" dataKey="withoutInflnAdj" stroke="red" />
          </LineChart>
        </ResponsiveContainer>
        <table width={"100%"} style={{ textAlign: "end" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Year</th>
              <th>Without Investment</th>
              <th>With Investment</th>
            </tr>
          </thead>
          <tbody>
            {resultArr.map((rowData, index) => (
              <tr key={"row" + index}>
                <td>{index + 1}</td>
                <td>{amountINRWithComma(rowData.withoutInvestment)}</td>
                <td>
                  {amountINRWithComma(rowData.withInvestment)} (
                  {(
                    ((rowData.withInvestment - rowData.withoutInvestment) /
                      rowData.withoutInvestment) *
                    100
                  ).toFixed(0)}
                  %)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default CalculationsAndResults;
