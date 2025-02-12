import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";
import {
  ActionType,
  useInvestmentDispatch,
  useInvestmentState,
} from "../context/InvestmentContext";
import { isValueInRange } from "../utils/validity";
import {
  INPUT_FIELD_METADATA,
  SLIDER_INPUT_METADATA,
} from "../constants/input";

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
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const age = investmentState.age;
  const activeMode = investmentState.mode;

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
      ({ title }) => title === investmentNature
    )?.shortName;
    urlParams.set("nature", natureShortName ?? "");
    urlParams.set("mode", activeMode.shortName ?? "");
    urlParams.set("age", age !== -1 ? age.toString() : "");
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
    // http://localhost:5173/?amount=15000&duration=8&interest=10.5&nature=monthly&mode=target
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length > 0) {
      const paramAmount = Number(params.amount);
      const paramDuration = Number(params.duration);
      const paramInterest = Number(params.interest);
      const paramNature = params.nature as InvestmentNatureShortName;
      const paramMode = params.mode as InvestmentModeShortName;
      const paramAge = Number(params.age);

      let isParamAmountInRange = isValueInRange(
        paramAmount,
        SLIDER_INPUT_METADATA.AMOUNT.min,
        SLIDER_INPUT_METADATA.AMOUNT.max
      );
      // Update Amount
      if (isParamAmountInRange) {
        dispatchInvestment({ type: ActionType.Amount, payload: paramAmount });
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
          payload: paramDuration,
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
          payload: paramInterest,
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
          payload: paramAge,
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
          },
        });
      }
    }

    // Remove the params from browser address bar
    // navigate(".", { replace: true });
  }, []);
  return { getShareableLink };
};

export default useInvestmentParams;
