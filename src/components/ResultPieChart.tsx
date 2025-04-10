import { useEffect, useRef, useState } from "react";
import { ResultPieChartProps } from "../types/resultPieChart";
import LoadingDots from "./LoadingDots";
import useDebounce from "../hooks/useDebounce";

const ResultPieChart: React.FC<ResultPieChartProps> = ({
  pieData,
  isAnimationActive = true,
  outerRadius = 80,
  innerRadius = 50,
}) => {
  const [pieDataDebounced, setPieDataDebounced] = useState(pieData);
  const [rechartsComponents, setRechartsComponents] = useState<{
    ResponsiveContainer: any;
    PieChart: any;
    Pie: any;
  }>({ ResponsiveContainer: null, PieChart: null, Pie: null }); // To store the rechart components after dynamic import
  const isChartLoadedRef = useRef(false); // Ref to prevent from import being called after recharts is imported
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // To store timeout id

  /**
   * Debounce the calculation to prevent performance issues in low end devices
   * */
  const debouncedPieDataUpdate = useDebounce(
    () => setPieDataDebounced(pieData),
    200
  );

  // Debounced calculation runs when pieData changes
  useEffect(() => {
    if (isAnimationActive) {
      // For normal chart
      debouncedPieDataUpdate();
    } else {
      setPieDataDebounced(pieData); // For share section
    }
  }, [pieData]);

  // Load recharts module
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
            PieChart: recharts.PieChart,
            Pie: recharts.Pie,
          });
          isChartLoadedRef.current = true;
        } catch (error) {
          console.error("Error while loading recharts ", error);
        }
      }
    };

    // Load recharts components only once
    if (!isChartLoadedRef.current) {
      if (isAnimationActive) {
        // For normal chart
        timeoutIdRef.current = setTimeout(() => {
          loadRecharts();
          timeoutIdRef.current = null;
        }, 500);
      } else {
        // Chart inside 'share as image' btn
        loadRecharts();
      }
    }

    // Clear pending timeout if any
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
          data={pieDataDebounced}
          dataKey="value"
          nameKey="title"
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="var(--color-accent-green)"
          cx="50%"
          cy="50%"
          animationEasing="ease"
          isAnimationActive={isAnimationActive}
        />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <LoadingDots />
  );
};

export default ResultPieChart;
