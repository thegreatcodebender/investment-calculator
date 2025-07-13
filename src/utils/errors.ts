import { CurrencyLocales } from "../types/currencyContext";
import {
  INPUT_FIELD_METADATA,
  SLIDER_INPUT_METADATA,
} from "../constants/input";

type GetInputErrorMessageType = (
  fieldName: string,
  currencyLocale: CurrencyLocales
) => string;

export const getInputErrorMessage: GetInputErrorMessageType = (
  fieldName,
  currencyLocale
) => {
  const ERRORS: { [key: string]: { rangeError: string } } = {
    AMOUNT: {
      rangeError: `Enter the amount between ${SLIDER_INPUT_METADATA.AMOUNT.min(
        currencyLocale
      )} - ${SLIDER_INPUT_METADATA.AMOUNT.max(currencyLocale)}.`,
    },
    DURATION: {
      rangeError: `Enter the timeline between ${SLIDER_INPUT_METADATA.DURATION.min} - ${SLIDER_INPUT_METADATA.DURATION.max} years.`,
    },
    INTEREST_RATE: {
      rangeError: `Enter the interest rate between ${SLIDER_INPUT_METADATA.INTEREST_RATE.min}% - ${SLIDER_INPUT_METADATA.INTEREST_RATE.max}%.`,
    },
    AGE: {
      rangeError: `Enter the age between ${INPUT_FIELD_METADATA.AGE.min} - ${INPUT_FIELD_METADATA.AGE.max}.`,
    },
    INFLATION: {
      rangeError: `Enter the inflation rate between ${INPUT_FIELD_METADATA.INFLATION.min}% - ${INPUT_FIELD_METADATA.INFLATION.max}%.`,
    },
  };
  const errorText = ERRORS[fieldName].rangeError;
  return errorText;
};
