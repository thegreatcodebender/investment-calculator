import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Card from "./Card";
import { RupeeIcon } from "./Icons";
import { useState } from "react";

const ResultCard = () => {
  const [resultTitle, setResultTitle] = useState(
    "Required Monthly Contribution"
  );
  const [resultVal, setResultVal] = useState(5430);
  const [projectedAge, setProjectedAge] = useState(32);
  const pieData = [
    {
      title: "Total Investment",
      value: 651587,
      fill: "var(--color-accent-green)",
    },
    { title: "Gains", value: 348413, fill: "var(--color-accent-purple)" },
  ];

  return (
    <Card
      className="w-full min-lg:w-[40%] max-lg:mt-8 px-0"
      bgColor="bg-primary-light"
    >
      <p className="sr-only">Calculation results</p>{" "}
      {/* For screen readers accessibility */}
      {/* Pie Chart */}
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
          <div>
            <p className="flex gap-2 items-center leading-none" key={pie.title}>
              <span
                className="w-[20px] h-[20px] rounded-0.5 block"
                style={{ backgroundColor: `${pie.fill}` }}
              ></span>
              <span>{pie.title}</span>
            </p>
            <p className="ps-7 flex gap-0.25 mt-2 items-center leading-none text-lg font-semibold">
              <RupeeIcon className="h-3.25" />
              {pie.value}
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
          {resultVal}
        </p>
      </div>
      {/* Sub text */}
      <p className="px-8 text-xs mt-4">
        You will achieve your target amount at the age of{" "}
        <span className="font-semibold">{projectedAge}</span> if start investing
        now!
      </p>
    </Card>
  );
};

export default ResultCard;
