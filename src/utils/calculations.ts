/**
 * Calculate monthly contribution required to achieve target amount
 * @param {number} targetAmount Target amount
 * @param {number} duration Number of years
 * @param {number} interestRate Interest rate in percentage
 * @returns {number} Monthly contribution
 */
export const calculateInvestmentMonthly = (
  targetAmount: number,
  duration: number,
  interestRate: number
): { contribution: number; totalInvestment: number; totalInterest: number } => {
  const monthlyInterest = interestRate / 12 / 100;
  const monthsCount = duration * 12;
  const contribution =
    (targetAmount * monthlyInterest) /
    ((1 + monthlyInterest) ** monthsCount - 1);
  const contributionRounded = Math.round(contribution);
  const totalInvestment = Math.round(contribution * monthsCount);
  const totalInterest = targetAmount - totalInvestment;
  return { contribution: contributionRounded, totalInvestment, totalInterest };
};
