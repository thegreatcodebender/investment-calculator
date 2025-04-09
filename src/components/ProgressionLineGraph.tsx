import { useEffect, useRef, useState } from "react";
import TooltipGraph from "./TooltipGraph";
import { ProgressionLineGraphProps } from "../types/progressionLineGraph";

const ProgressionLineGraph: React.FC<ProgressionLineGraphProps> = ({
  height,
  resultArr,
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
  });
  const [isChartLoaded, setIsChartLoaded] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadRecharts = async () => {
      if (
        !isChartLoaded &&
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
          setIsChartLoaded(true);
        } catch (error) {
          console.error("Error while loading recharts ", error);
        }
      }
    };

    // document.addEventListener("readystatechange", loadRecharts);
    // return () => document.removeEventListener("readystatechange", loadRecharts);

    if (!isChartLoaded)
      timeoutIdRef.current = setTimeout(() => {
        loadRecharts();
        timeoutIdRef.current = null;
      }, 500);

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
    <div className="flex justify-center items-center h-full space-x-2">
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse delay-75"></div>
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse delay-150"></div>
    </div>
  );
};

export default ProgressionLineGraph;
