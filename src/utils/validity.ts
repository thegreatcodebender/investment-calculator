import { removeCommaFromString } from "./display";

/**
 * Check if the value is in range of provided minimum and maximum values
 * @param {number | string} value - Value to be checked
 * @param {number} min - Maximum acceptable value
 * @param {number} max - Minimum acceptable value
 * @returns {boolean} Boolean value
 */
export const isValueInRange = (
  value: number | string,
  min: number,
  max: number
): boolean => {
  const formattedValue = removeCommaFromString(String(value));
  if (isNaN(Number(formattedValue)) || isNaN(min) || isNaN(max)) return false;
  if (Number(formattedValue) < min || Number(formattedValue) > max)
    return false;
  return true;
};
