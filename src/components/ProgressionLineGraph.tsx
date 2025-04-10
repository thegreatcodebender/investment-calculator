import { useEffect, useRef, useState } from "react";
import TooltipGraph from "./TooltipGraph";
import { ProgressionLineGraphProps } from "../types/progressionLineGraph";
import LoadingDots from "./LoadingDots";
import {
  calculateInvestmentProgression,
  InvestmentProgressionResultObj,
} from "../utils/calculations";
import { useInvestmentState } from "../context/InvestmentContext";
import useDebounce from "../hooks/useDebounce";

const ProgressionLineGraph: React.FC<ProgressionLineGraphProps> = ({
  height,
}) => {
  const [rechartsComponents, setRechartsComponents] = useState<{
    ResponsiveContainer: any;
    LineChart: any;
    XAxis: any;
    Tooltip: any;
    Line: any;
  }>({
    ResponsiveContainer: null,
    LineChart: null,
    XAxis: null,
    Tooltip: null,
    Line: null,
  }); // To store the rechart components after dynamic import
  const [resultArr, setResultArr] = useState<
    InvestmentProgressionResultObj[] | null
  >(null);
  const isChartLoadedRef = useRef(false); // Ref to prevent from import being called after recharts is imported
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // To store timeout id
  const investmentState = useInvestmentState(); // Investment state
  // Debounce the calculation to prevent performance issue in low end devices
  const debouncedProgressionCalculation = useDebounce(() => {
    setResultArr(() =>
      calculateInvestmentProgression({
        amount: investmentState.amount.actualValue,
        duration: investmentState.duration.actualValue,
        interestRate: investmentState.interestRate.actualValue,
        investmentMode: investmentState.mode.title,
        investmentNature: investmentState.investmentNature.actualValue,
        inflationRate: investmentState.inflation.actualValue,
      })
    );
  });

  // Debounced calculation runs when investmentState changes
  useEffect(() => {
    debouncedProgressionCalculation();
  }, [investmentState]);

  // Import recharts and set recharts component state
  useEffect(() => {
    const loadRecharts = async () => {
      if (
        !isChartLoadedRef.current &&
        (document.readyState === "interactive" ||
          document.readyState === "complete")
      ) {
        try {
          const recharts = await import("recharts");
          setRechartsComponents({
            ResponsiveContainer: recharts.ResponsiveContainer,
            LineChart: recharts.LineChart,
            XAxis: recharts.XAxis,
            Tooltip: recharts.Tooltip,
            Line: recharts.Line,
          });
          isChartLoadedRef.current = true;
        } catch (error) {
          console.error("Error while loading recharts ", error);
        }
      }
    };

    // Load recharts components only once
    if (!isChartLoadedRef.current)
      timeoutIdRef.current = setTimeout(() => {
        loadRecharts();
        timeoutIdRef.current = null;
      }, 500);

    // Clear pending timeout if any
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const { ResponsiveContainer, LineChart, XAxis, Tooltip, Line } =
    rechartsComponents;

  return ResponsiveContainer && LineChart && XAxis && Tooltip && Line ? (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        width={500}
        height={300}
        data={resultArr}
        margin={{
          top: 5,
          right: 4,
          left: 4,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="year"
          stroke="rgba(0,0,0,.5)"
          tickSize={2}
          fontSize={12}
          tickMargin={4}
          tickFormatter={(year: number) => new Date().getFullYear() + year}
          interval={"preserveStartEnd"}
          minTickGap={10}
        />
        <Tooltip content={<TooltipGraph />} />
        <Line
          type="monotone"
          name="Without Investment"
          dataKey="withoutInvestment"
          stroke="#BD4787"
          dot={false}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          name="Inflation Adjusted (without investment)"
          dataKey="withoutInvestmentInflnAdj"
          stroke="#BD4787"
          dot={false}
          strokeWidth={1}
          strokeOpacity={0.75}
          strokeDasharray={"5 3"}
        />
        <Line
          type="monotone"
          name="With Investment"
          dataKey="withInvestment"
          stroke="#47bd7d"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          name="Inflation Adjusted (with investment)"
          dataKey="withInvestmentInflnAdj"
          stroke="#47bd7d"
          dot={false}
          strokeWidth={1}
          strokeOpacity={0.75}
          strokeDasharray={"5 2"}
        />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <LoadingDots />
  );
};

export default ProgressionLineGraph;
