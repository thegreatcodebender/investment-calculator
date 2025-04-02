import Card from "./Card";
import { currencyInWords } from "../utils/display";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { InvestmentProgressionResultObj } from "../utils/calculations";
import TooltipGraph from "./TooltipGraph";
import useIsMobile from "../hooks/useIsMobile";

const LineGraphCard = ({
  resultArr,
}: {
  resultArr: InvestmentProgressionResultObj[];
}) => {
  const isMobile = useIsMobile();
  return (
    <Card className="max-lg:mt-8 min-w-[300px] mt-6">
      <h3 className="text-lg font-semibold mb-2 leading-snug">
        Feel the investment progression
      </h3>
      <ResponsiveContainer width="100%" height={isMobile ? 350 : 300}>
        <LineChart
          width={500}
          height={300}
          data={resultArr}
          margin={{
            top: 5,
            right: 4,
            left: isMobile
              ? resultArr[resultArr.length - 1].withInvestment > 99999999 // To prevent clipping of y-axis value
                ? 0
                : -32
              : -28,
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
          />
          <YAxis
            dataKey="withInvestment"
            stroke="rgba(0,0,0,.5)"
            tickFormatter={(value) => {
              if (value === 0) return "";
              return currencyInWords({
                amount: value,
                shortName: true,
              });
            }}
            tickSize={2}
            fontSize={12}
            tickMargin={4}
          />
          <Tooltip content={<TooltipGraph />} />
          {/* <Legend style={{ visibility: "hidden" }} fontSize={12} /> */}
          <Line
            type="monotone"
            name="With Investment"
            dataKey="withInvestment"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            name="Without Investment"
            dataKey="withoutInvestment"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
          {/* <Line
            type="monotone"
            name="Inflation Adjusted (with investment)"
            dataKey="withInvestmentInflnAdj"
            stroke="purple"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            name="Inflation Adjusted (without investment)"
            dataKey="withoutInvestmentInflnAdj"
            stroke="red"
            dot={false}
            strokeWidth={2}
          /> */}
        </LineChart>
      </ResponsiveContainer>
      {/* <table width={"100%"} style={{ textAlign: "end" }}>
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
      </table> */}
    </Card>
  );
};

export default LineGraphCard;
