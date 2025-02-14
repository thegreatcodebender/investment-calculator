import { amountINRWithComma } from "../utils/display";
import { INPUT_FIELD_METADATA, SLIDER_INPUT_METADATA } from "./input";

export const INPUT_ERROR_MESSAGE = {
  AMOUNT: {
    rangeError: `Amount must be in the range ${amountINRWithComma(
      SLIDER_INPUT_METADATA.AMOUNT.min
    )} - ${amountINRWithComma(SLIDER_INPUT_METADATA.AMOUNT.max)} rupees.`,
  },
  DURATION: {
    rangeError: `Duration must be in the range ${SLIDER_INPUT_METADATA.DURATION.min} - ${SLIDER_INPUT_METADATA.DURATION.max} years.`,
  },
  INTEREST_RATE: {
    rangeError: `Interest must be in the range ${SLIDER_INPUT_METADATA.INTEREST_RATE.min}% - ${SLIDER_INPUT_METADATA.INTEREST_RATE.max}%.`,
  },
  AGE: {
    rangeError: `Age must be in the range ${INPUT_FIELD_METADATA.AGE.min} - ${INPUT_FIELD_METADATA.AGE.max}.`,
  },
};
