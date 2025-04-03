import Card from "./Card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { InvestmentProgressionResultObj } from "../utils/calculations";
import TooltipGraph from "./TooltipGraph";
import useIsMobile from "../hooks/useIsMobile";

interface LineGraphCardProps {
  resultArr: InvestmentProgressionResultObj[];
}

const LineGraphCard = ({ resultArr }: LineGraphCardProps) => {
  const isMobile = useIsMobile();
  return (
    <Card className="max-lg:mt-8 min-w-[300px] mt-6">
      <h3 className="mb-0.5 text-lg font-semibold leading-snug">
        Feel the investment progression
      </h3>
      <p className="mb-2 text-sm text-gray-600">
        An interactive chart showing how your investment grows over time.{" "}
        {isMobile ? "Touch " : "Hover over "}
        the chart to know more.
      </p>
      <ResponsiveContainer width="100%" height={isMobile ? 350 : 300}>
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
            tickFormatter={(year) => new Date().getFullYear() + year}
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
      <p className="mb-2 text-xs text-gray-600">
        KCr - Thousand Crores, LCr - Lakh Crores
      </p>
    </Card>
  );
};

export default LineGraphCard;
