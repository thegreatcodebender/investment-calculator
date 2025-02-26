import { SummaryCardProps } from "../types/card";
import { amountINRWithComma } from "../utils/display";
import { RupeeIcon } from "./Icons";

const SummaryCard = ({
  calculationResult,
  resultTitle,
  isCalculationCardVisible,
  investmentState,
}: SummaryCardProps) => {
  const { contribution, investmentAndInterestTotal } = calculationResult;
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const investmentMode = investmentState.mode;
  return (
    <div
      className={`${
        isCalculationCardVisible ? "bottom-2" : "top-2"
      } fixed flex justify-center left-0 w-full  z-9999 lg:hidden`}
      aria-hidden
    >
      <div
        className="py-2 px-4 border-1 border-gray-200 bg-white rounded-lg shadow-xl"
        aria-hidden
      >
        {isCalculationCardVisible ? (
          <>
            <p className="opacity-80 text-sm text-nowrap text-center">
              {resultTitle}
            </p>
            <p className="opacity-80 mt-1 text-sm flex gap-0.75 font-semibold items-center justify-center leading-none">
              <RupeeIcon className="h-[10px]" />
              {contribution === -1
                ? amountINRWithComma(investmentAndInterestTotal)
                : amountINRWithComma(contribution)}
            </p>
            <p className="text-center font-medium h-4 text-primary">
              <span className="material-symbols-outlined !text-lg !leading-none rotate-90">
                chevron_right
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="text-center font-medium h-4 text-primary">
              <span className="material-symbols-outlined !text-lg  !leading-none rotate-[-90deg]">
                chevron_right
              </span>
            </p>
            <div className="opacity-80 text-sm text-nowrap text-center">
              <span className="capitalize flex gap-0.5 items-center justify-center">
                {" "}
                {investmentMode.shortName}: <RupeeIcon className="h-[10px]" />
                {amountINRWithComma(amount.actualValue)}
              </span>
              {duration.actualValue} yrs • {interest.actualValue}% •{" "}
              {investmentNature.actualValue}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
