import { lazy, Suspense } from "react";
import TooltipGraph from "./TooltipGraph";
import { ProgressionLineGraphProps } from "../types/progressionLineGraph";

const RechartsGraphComponent = lazy(() =>
  import("recharts")
    .then((module) => {
      return {
        default: (props: ProgressionLineGraphProps) => (
          <module.ResponsiveContainer
            width="100%"
            height={props.isMobile ? 350 : 300}
          >
            <module.LineChart
              width={500}
              height={300}
              data={props.resultArr}
              margin={{
                top: 5,
                right: 4,
                left: 4,
                bottom: 5,
              }}
            >
              <module.XAxis
                dataKey="year"
                stroke="rgba(0,0,0,.5)"
                tickSize={2}
                fontSize={12}
                tickMargin={4}
                tickFormatter={(year) => new Date().getFullYear() + year}
                interval={"preserveStartEnd"}
                minTickGap={10}
              />
              <module.Tooltip content={<TooltipGraph />} />
              <module.Line
                type="monotone"
                name="Without Investment"
                dataKey="withoutInvestment"
                stroke="#BD4787"
                dot={false}
                strokeWidth={2}
              />
              <module.Line
                type="monotone"
                name="Inflation Adjusted (without investment)"
                dataKey="withoutInvestmentInflnAdj"
                stroke="#BD4787"
                dot={false}
                strokeWidth={1}
                strokeOpacity={0.75}
                strokeDasharray={"5 3"}
              />
              <module.Line
                type="monotone"
                name="With Investment"
                dataKey="withInvestment"
                stroke="#47bd7d"
                strokeWidth={2}
                dot={false}
              />
              <module.Line
                type="monotone"
                name="Inflation Adjusted (with investment)"
                dataKey="withInvestmentInflnAdj"
                stroke="#47bd7d"
                dot={false}
                strokeWidth={1}
                strokeOpacity={0.75}
                strokeDasharray={"5 2"}
              />
            </module.LineChart>
          </module.ResponsiveContainer>
        ),
      };
    })
    .catch((err) => {
      console.error("Failed to load Recharts:", err);
      throw err;
    })
);

const ProgressionLineGraph: React.FC<ProgressionLineGraphProps> = ({
  isMobile,
  resultArr,
}) => {
  return (
    <Suspense
      fallback={
        <div className="text-center opacity-0" aria-hidden>
          Loading Chart...
        </div>
      }
    >
      <RechartsGraphComponent isMobile={isMobile} resultArr={resultArr} />
    </Suspense>
  );
};

export default ProgressionLineGraph;
