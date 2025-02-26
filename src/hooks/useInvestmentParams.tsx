import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";
import {
  useInvestmentDispatch,
  useInvestmentState,
} from "../context/InvestmentContext";
import { isValueInRange } from "../utils/validity";
import {
  INPUT_FIELD_METADATA,
  SLIDER_INPUT_METADATA,
} from "../constants/input";
import { ActionType } from "../types/investmentContext";

const investmentNatureShortNames = INVESTMENT_NATURE_LIST.map(
  ({ shortName }) => shortName
);
type InvestmentNatureShortName = (typeof investmentNatureShortNames)[number];
const investmentModeShortNames = INVESTMENT_MODES.map(
  ({ shortName }) => shortName
);
type InvestmentModeShortName = (typeof investmentModeShortNames)[number];

const useInvestmentParams = () => {
  const [searchParams] = useSearchParams();
  const investmentState = useInvestmentState();
  const dispatchInvestment = useInvestmentDispatch();
  const amount = investmentState.amount.actualValue;
  const duration = investmentState.duration.actualValue;
  const interest = investmentState.interestRate.actualValue;
  const investmentNature = investmentState.investmentNature;
  const age = investmentState.age.actualValue;
  const investmentMode = investmentState.mode;
  const inflation = investmentState.inflation.actualValue;

  /**
   * Construct URL params for creating the link
   * @returns URL params
   */
  const constructUrlParams = () => {
    const urlParams = new URLSearchParams();
    urlParams.set("amount", amount.toString());
    urlParams.set("duration", duration.toString());
    urlParams.set("interest", interest.toString());
    const natureShortName = INVESTMENT_NATURE_LIST.find(
      ({ title }) => title === investmentNature.actualValue
    )?.shortName;
    urlParams.set("nature", natureShortName ?? "");
    urlParams.set("mode", investmentMode.shortName ?? "");
    urlParams.set("age", age !== -1 ? age.toString() : "");
    urlParams.set("inflation", inflation ? inflation.toString() : "");
    return urlParams;
  };

  /**
   * Get shareable URL
   * @returns URL with params
   */
  const getShareableLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const paramsString = constructUrlParams().toString();
    return `${baseUrl}?${paramsString}`;
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length > 0) {
      const paramAmount = Number(params.amount);
      const paramDuration = Number(params.duration);
      const paramInterest = Number(params.interest);
      const paramNature = params.nature as InvestmentNatureShortName;
      const paramMode = params.mode as InvestmentModeShortName;
      const paramAge = Number(params.age);
      const paramInflation = Number(params.inflation);

      const isParamAmountInRange = isValueInRange(
        paramAmount,
        SLIDER_INPUT_METADATA.AMOUNT.min,
        SLIDER_INPUT_METADATA.AMOUNT.max
      );
      // Update Amount
      if (isParamAmountInRange) {
        dispatchInvestment({
          type: ActionType.Amount,
          payload: { inputValue: paramAmount, actualValue: paramAmount },
        });
      }
      if (
        isValueInRange(
          paramDuration,
          SLIDER_INPUT_METADATA.DURATION.min,
          SLIDER_INPUT_METADATA.DURATION.max
        )
      ) {
        dispatchInvestment({
          type: ActionType.Duration,
          payload: { inputValue: paramDuration, actualValue: paramDuration },
        });
      }
      // Update Interest rate
      if (
        isValueInRange(
          paramInterest,
          SLIDER_INPUT_METADATA.INTEREST_RATE.min,
          SLIDER_INPUT_METADATA.INTEREST_RATE.max
        )
      ) {
        dispatchInvestment({
          type: ActionType.InterestRate,
          payload: { inputValue: paramInterest, actualValue: paramInterest },
        });
      }
      // Update Age
      if (
        isValueInRange(
          paramAge,
          INPUT_FIELD_METADATA.AGE.min,
          INPUT_FIELD_METADATA.AGE.max
        )
      ) {
        dispatchInvestment({
          type: ActionType.Age,
          payload: { inputValue: paramAge, actualValue: paramAge },
        });
      }
      // Update Investment Nature
      if (
        investmentNatureShortNames.some(
          (shortName) => shortName === paramNature
        )
      ) {
        dispatchInvestment({
          type: ActionType.InvestmentNature,
          payload: INVESTMENT_NATURE_LIST.find(
            ({ shortName }) => shortName === paramNature
          )?.title,
        });
      }
      // Update Inflation Rate
      if (
        isValueInRange(
          paramInflation,
          INPUT_FIELD_METADATA.INFLATION.min,
          INPUT_FIELD_METADATA.INFLATION.max
        )
      ) {
        dispatchInvestment({
          type: ActionType.Inflation,
          payload: { inputValue: paramInflation, actualValue: paramInflation },
        });
      }
      // Update Investment Mode
      if (
        investmentModeShortNames.some((shortName) => shortName === paramMode)
      ) {
        const investmentModeObj = INVESTMENT_MODES.find(
          ({ shortName }) => shortName === paramMode
        );
        dispatchInvestment({
          type: ActionType.Mode,
          payload: {
            ...investmentModeObj,
            defaultAmount: isParamAmountInRange
              ? paramAmount
              : investmentModeObj?.defaultAmount,
            prevModeAmount: -1,
          },
        });

        // Remove query parameters and keep the subfolder path intact
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, []);
  return { getShareableLink };
};

export default useInvestmentParams;
