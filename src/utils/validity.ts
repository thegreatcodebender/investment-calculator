/**
 * Check if the value is in range
 * @param {number} value - Value to be checked
 * @param {number} min - Maximum acceptable value
 * @param {number} max - Minimum acceptable value
 * @returns {boolean} Boolean value
 */
export const isValueInRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  if (isNaN(value) || isNaN(min) || isNaN(max)) return false;
  if (value < min || value > max) return false;
  return true;
};
