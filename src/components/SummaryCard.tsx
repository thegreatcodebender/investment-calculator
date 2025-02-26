import { CalculationCardProps } from "../types/card";
import { amountINRWithComma } from "../utils/display";
import { RupeeIcon } from "./Icons";

const SummaryCard = ({
  calculationResult,
  resultTitle,
}: CalculationCardProps) => {
  const { contribution, investmentAndInterestTotal } = calculationResult;
  return (
    <div
      className="fixed flex justify-center left-0 w-full bottom-2 z-999 lg:hidden"
      aria-hidden
    >
      <div
        className="py-2 px-4 border-1 border-gray-200 bg-white rounded-lg shadow-xl"
        aria-hidden
      >
        <p className="opacity-80 text-sm text-nowrap text-center">
          {resultTitle}
        </p>
        <p className="opacity-80 mt-1 text-sm flex gap-0.75 font-semibold items-center justify-center leading-none">
          <RupeeIcon className="h-[12px]" />
          {contribution === -1
            ? amountINRWithComma(investmentAndInterestTotal)
            : amountINRWithComma(contribution)}
        </p>
        <p className="!text-xs text-center font-medium mt-0.5 px-2 flex gap-1 items-center justify-center text-primary">
          <span className="material-symbols-outlined mb-[-4px] !leading-none rotate-90">
            chevron_right
          </span>
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
