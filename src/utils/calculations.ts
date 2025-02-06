/**
 * Calculate monthly contribution required to achieve target amount
 * @param {number} targetAmount Target amount
 * @param {number} duration Number of years
 * @param {number} interestRate Interest rate in percentage
 * @returns {number} Monthly contribution
 */
export const getMonthlyContribution = (
  targetAmount: number,
  duration: number,
  interestRate: number
): number => {
  const monthlyInterest = interestRate / 12 / 100;
  const monthsCount = duration * 12;
  const result =
    (targetAmount * monthlyInterest) /
    ((1 + monthlyInterest) ** monthsCount - 1);

  return Math.round(result);
};
