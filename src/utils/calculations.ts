import { INVESTMENT_MODES } from "../constants/investment";

interface InvestmentParams {
  amount: number;
  duration: number;
  interestRate: number;
  investmentMode: string;
  investmentNature: string;
}
interface InvestmentResult {
  contribution: number;
  totalInvestment: number;
  totalInterest: number;
  investmentAndInterestTotal: number;
}
/**
 * Calculate monthly contribution required to achieve target amount
 * @param {Object} params Parameters
 * @param {number} params.duration Number of years
 * @param {number} params.interestRate Interest rate in percentage
 * @param {string} params.investmentMode Investment mode
 * @param {string} params.investmentNature Investment nature
 * @returns {InvestmentMonthlyResult} Monthly contribution, Total investment, Total interest
 */
export const calculateInvestment = ({
  amount,
  duration,
  interestRate,
  investmentMode,
  investmentNature,
}: InvestmentParams): InvestmentResult => {
  let contribution,
    totalInvestment = -1,
    totalInterest = -1,
    contributionRounded = -1,
    totalInvestmentRounded = -1,
    investmentAndInterestTotal = -1;
  const monthlyInterest = interestRate / 12 / 100;
  const monthsCount = duration * 12;
  switch (investmentMode) {
    case INVESTMENT_MODES[0].title:
      const targetAmount = amount;
      contribution =
        (targetAmount * monthlyInterest) /
        ((1 + monthlyInterest) ** monthsCount - 1);
      contributionRounded = Math.round(contribution);
      totalInvestment = Math.round(contribution * monthsCount);
      totalInterest = targetAmount - totalInvestment;
      investmentAndInterestTotal = totalInvestment + totalInterest;
      break;
    case INVESTMENT_MODES[1].title:
      const investmentAmount = amount;
      investmentAndInterestTotal =
        (investmentAmount * ((1 + monthlyInterest) ** monthsCount - 1)) /
        monthlyInterest;
      totalInvestment = investmentAmount * monthsCount;
      totalInterest = Math.round(investmentAndInterestTotal - totalInvestment);
      break;
  }

  totalInvestmentRounded = Math.round(totalInvestment);

  return {
    contribution: contributionRounded,
    totalInvestment,
    totalInterest,
    investmentAndInterestTotal,
  };
};
