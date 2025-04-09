import { lazy, Suspense } from "react";
import { ResultPieChartProps } from "../types/resultPieChart";

const RechartsGraphComponent = lazy(() =>
  import("recharts")
    .then((module) => {
      return {
        default: (props: any) => (
          <module.ResponsiveContainer {...props}>
            <module.PieChart {...props}>
              <module.Pie
                data={props.pieData}
                dataKey="value"
                nameKey="title"
                outerRadius={props.outerRadius}
                innerRadius={props.innerRadius}
                fill="var(--color-accent-green)"
                cx="50%"
                cy="50%"
                isAnimationActive={props.isAnimationActive}
              />
            </module.PieChart>
          </module.ResponsiveContainer>
        ),
      };
    })
    .catch((err) => {
      console.error("Failed to load Recharts:", err);
      throw err;
    })
);

const ResultPieChart: React.FC<ResultPieChartProps> = ({
  pieData,
  isAnimationActive = true,
  outerRadius = 80,
  innerRadius = 50,
}) => {
  return (
    <Suspense
      fallback={
        <div className="text-center" aria-hidden>
          Loading Chart...
        </div>
      }
    >
      <RechartsGraphComponent
        pieData={pieData}
        isAnimationActive={isAnimationActive}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
      />
    </Suspense>
  );
};

export default ResultPieChart;
