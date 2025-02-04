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
  const monthlyInterest = interestRate / 12;
  const monthsCount = duration * 12;
  const result =
    (targetAmount * monthlyInterest) /
    ((1 + monthlyInterest) ** monthsCount - 1);
  console.log(`(targetAmount * monthlyInterest) /
    (((1 + monthlyInterest) ** monthsCount) - 1): (${targetAmount} * ${monthlyInterest}) /
    (((1 + ${monthlyInterest})** ${monthsCount}) - 1)`);
  console.log("calc", (1 + monthlyInterest) ** 36);

  return result;
};
