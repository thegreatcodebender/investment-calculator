import { SLIDER_INPUT_METADATA } from "./input";

export const SLIDER_ERROR_MESSAGE = {
  AMOUNT: {
    rangeError: `Amount must be in the range ${SLIDER_INPUT_METADATA.AMOUNT.min} - ${SLIDER_INPUT_METADATA.AMOUNT.max} rupees.`,
  },
  DURATION: {
    rangeError: `Duration must be in the range ${SLIDER_INPUT_METADATA.DURATION.min} - ${SLIDER_INPUT_METADATA.DURATION.max} years.`,
  },
  INTEREST_RATE: {
    rangeError: `Interest must be in the range ${SLIDER_INPUT_METADATA.INTEREST_RATE.min}% - ${SLIDER_INPUT_METADATA.INTEREST_RATE.max}%.`,
  },
};
