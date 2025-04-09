import { useEffect, useRef, useState } from "react";
import { ResultPieChartProps } from "../types/resultPieChart";

const ResultPieChart: React.FC<ResultPieChartProps> = ({
  pieData,
  isAnimationActive = true,
  outerRadius = 80,
  innerRadius = 50,
}) => {
  const [rechartsComponents, setRechartsComponents] = useState<{
    ResponsiveContainer: any;
    PieChart: any;
    Pie: any;
  }>({ ResponsiveContainer: null, PieChart: null, Pie: null });
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
            PieChart: recharts.PieChart,
            Pie: recharts.Pie,
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

  const { ResponsiveContainer, PieChart, Pie } = rechartsComponents;
  return ResponsiveContainer && PieChart && Pie ? (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="title"
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="var(--color-accent-green)"
          cx="50%"
          cy="50%"
          isAnimationActive={isAnimationActive}
        />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <div className="flex justify-center items-center h-full space-x-2">
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse delay-75"></div>
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse delay-150"></div>
    </div>
  );
};

export default ResultPieChart;
