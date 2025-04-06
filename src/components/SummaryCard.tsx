import { PropsWithChildren } from "react";
import { SummaryCardContainerProps, SummaryCardProps } from "../types/card";
import { amountINRWithComma } from "../utils/display";
import { RupeeIcon } from "./Icons";
import { useCalculationCardState } from "../context/CalculationCardContext";

const SummaryCardContainer: React.FC<
  PropsWithChildren<SummaryCardContainerProps>
> = ({ position, isVisible, children, handleClick }) => {
  return (
    <div
      className={`${position === "bottom" ? "bottom-2" : "top-2"} ${
        !isVisible
          ? position === "bottom"
            ? "bottom-[-200px]"
            : "top-[-200px]"
          : ""
      } motion-safe:transition-all ease-cubic-bezier duration-400 motion-safe:animate-fade-in fixed flex justify-center left-0 w-full  z-9999 lg:hidden`}
      aria-hidden
    >
      <div
        className={`py-2 ${
          position === "bottom" ? "pb-0 shadow-xl-bottom" : "pt-0  shadow-xl"
        } w-[calc(100%_-_40px)] border-1 border-gray-200 bg-white rounded-lg overflow-hidden cursor-pointer`}
        onClick={handleClick}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
};

const SummaryCard = ({
  calculationResult,
  resultTitle,
  investmentState,
  calculationCardRef,
  resultCardRef,
}: SummaryCardProps) => {
  const { contribution, investmentAndInterestTotal } = calculationResult;
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const investmentMode = investmentState.mode;

  const calculationCardState = useCalculationCardState();
  const isCalculationCardVisible =
    calculationCardState.isCalculationCardVisible;

  /**
   * Handle scroll to required card when summary card is clicked
   */
  const handleClick = () => {
    if (isCalculationCardVisible) {
      if (resultCardRef && resultCardRef.current) {
        const { top: cardTop } = resultCardRef.current.getBoundingClientRect();
        window.scrollTo({
          behavior: "auto",
          top: cardTop + window.scrollY - 80,
        });
      }
    } else {
      if (calculationCardRef.current) {
        calculationCardRef.current.scrollIntoView({
          behavior: "auto",
          inline: "start",
        });
      }
    }
  };

  return (
    isCalculationCardVisible !== null && (
      <>
        <SummaryCardContainer
          position="bottom"
          isVisible={isCalculationCardVisible}
          handleClick={handleClick}
        >
          <p className="opacity-80 text-sm text-nowrap text-center">
            {resultTitle}
          </p>
          <p className="opacity-80 my-1 text-sm flex gap-0.75 font-semibold items-center justify-center leading-none">
            <RupeeIcon className="h-[10px]" />
            {contribution === -1
              ? amountINRWithComma(investmentAndInterestTotal)
              : amountINRWithComma(contribution)}
          </p>
          <div className="text-center font-medium h-4 text-white bg-accent-purple">
            <span className="material-symbols-outlined !text-lg  !leading-none rotate-90">
              chevron_right
            </span>
          </div>
        </SummaryCardContainer>
        <SummaryCardContainer
          position="top"
          isVisible={!isCalculationCardVisible}
          handleClick={handleClick}
        >
          <div className="text-center font-medium h-4 text-white bg-accent-purple">
            <span className="material-symbols-outlined !text-lg  !leading-none rotate-[-90deg]">
              chevron_right
            </span>
          </div>
          <div className="opacity-80 mt-1 text-sm text-nowrap text-center">
            <span className="capitalize flex gap-0.5 items-center justify-center">
              {investmentMode.shortName}: <RupeeIcon className="h-[10px]" />
              {amountINRWithComma(amount.actualValue)}
            </span>
            {duration.actualValue} yrs <span className="text-gray-400">•</span>{" "}
            {interest.actualValue}% <span className="text-gray-400">•</span>{" "}
            {investmentNature.actualValue}
          </div>
        </SummaryCardContainer>
      </>
    )
  );
};

export default SummaryCard;
