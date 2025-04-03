import { useInvestmentState } from "../context/InvestmentContext";
import { currencyInWords } from "../utils/display";
import { RupeeIcon } from "./Icons";

interface TooltipGraphProps {
  payload?: {
    name: string;
    stroke: string;
    strokeWidth: number;
    fill: string;
    dataKey: string;
    color: string;
    value: number;
    payload: {
      year: number;
      withInvestment: number;
      withInvestmentInflnAdj: number;
      withoutInvestmentInflnAdj: number;
      withoutInvestment: number;
      [key: string]: number;
    };
    hide: boolean;
  }[];
}

const TooltipGraph = ({ payload }: TooltipGraphProps) => {
  const investmentState = useInvestmentState();
  const age = investmentState.age.actualValue;
  const dataKeysToShow = ["withInvestment", "withoutInvestment"];

  return (
    <div className="rounded-sm bg-white border-1 border-gray-300 overflow-clip relative md:shadow-xl">
      <div className="px-3 py-2">
        {payload &&
          // Map dataKeys array to make withInvestment appear on the top since default order is based on the <Line> order
          dataKeysToShow.map((dataKey) => {
            const data = payload.find((item) => item.dataKey === dataKey);
            if (!data) return "";
            if (dataKeysToShow.some((keyName) => keyName === data.dataKey)) {
              return (
                <div
                  className="not-last:border-b-1 border-gray-300 not-last:pb-2 not-last:mb-2  pe-4"
                  key={data.dataKey}
                >
                  <div className="flex gap-2 items-center leading-none">
                    {/* Legend color box */}
                    <div
                      className="w-[4px] max-md:h-[30px] h-[36px] block"
                      style={{ backgroundColor: `${data.stroke}` }}
                    ></div>
                    <div>
                      {/* Main title */}
                      <span className="max-md:text-xs text-sm leading-none">
                        {data.name}
                      </span>
                      <div className="flex gap-0.75 items-center max-md:text-sm text-lg font-semibold leading-snug">
                        {/* Amount */}
                        <RupeeIcon className="max-md:h-2.75 h-3.25" />
                        <p>
                          {data.value === 0
                            ? "0"
                            : currencyInWords({
                                amount: data.value,
                                decimalCount: 2,
                                shortName: true,
                              })}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Amount (inflation adjusted) */}
                  <div className="flex gap-0.5 items-center text-xs mt-1.5 leading-none text-gray-700">
                    <p className="font-normal">Inflation adjusted: </p>
                    <RupeeIcon className="h-2.25 opacity-75" />
                    <p className="font-semibold">
                      {data.value === 0
                        ? "0"
                        : currencyInWords({
                            amount: data.payload[`${data.dataKey}InflnAdj`],
                            decimalCount: 2,
                            shortName: true,
                          })}
                    </p>
                  </div>
                </div>
              );
            }
          })}
      </div>
      {/* Projected age and year */}
      {payload && payload[0] && (
        <p className="p-1.25 text-white text-xs font-semibold leading-none text-center bg-gray-700">
          {age !== -1 && (
            <>
              At age {age + payload[0].payload.year}{" "}
              {<span className="text-xs opacity-60">•</span>}{" "}
            </>
          )}
          {new Date().getFullYear() + payload[0].payload.year}
        </p>
      )}
    </div>
  );
};

export default TooltipGraph;
