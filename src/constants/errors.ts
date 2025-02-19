import { amountINRWithComma } from "../utils/display";
import { INPUT_FIELD_METADATA, SLIDER_INPUT_METADATA } from "./input";

interface INPUT_ERROR_MESSAGE_TYPE {
  [key: string]: { rangeError: string };
}

export const INPUT_ERROR_MESSAGE: INPUT_ERROR_MESSAGE_TYPE = {
  AMOUNT: {
    rangeError: `Enter the amount between ${amountINRWithComma(
      SLIDER_INPUT_METADATA.AMOUNT.min
    )} - ${amountINRWithComma(SLIDER_INPUT_METADATA.AMOUNT.max)} rupees.`,
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
