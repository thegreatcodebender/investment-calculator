import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";

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
 * @param {string} params.investmentMode Investment mode - Goal or target
 * @param {string} params.investmentNature Investment nature - monthly or lump sum
 * @returns {Object} Investment details.
 * @property {number} contribution - Monthly contribution required
 * @property {number} totalInvestment - Total amount invested
 * @property {number} totalInterest - Total interest earned
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
    investmentAndInterestTotal = -1;
  const monthlyInterest = interestRate / 12 / 100; // Monthly interest rate
  const monthsCount = duration * 12; // Total no of months
  switch (investmentMode) {
    case INVESTMENT_MODES[0].title: {
      // Case - Target amount
      const targetAmount = amount;
      if (investmentNature === INVESTMENT_NATURE_LIST[0].title) {
        // Monthly contribution
        contribution =
          (targetAmount * monthlyInterest) /
          ((1 + monthlyInterest) ** monthsCount - 1);
        contributionRounded = contribution;
        totalInvestment = contribution * monthsCount;
        totalInterest = targetAmount - totalInvestment;
      } else {
        contribution = targetAmount / (1 + monthlyInterest) ** monthsCount; // One-time contribution
        contributionRounded = contribution;
        totalInvestment = targetAmount;
        totalInterest = targetAmount - contribution;
      }
      investmentAndInterestTotal = totalInvestment + totalInterest;
      break;
    }
    case INVESTMENT_MODES[1].title: {
      // Case - Periodic investment amount
      const investmentAmount = amount;
      if (investmentNature === INVESTMENT_NATURE_LIST[0].title) {
        investmentAndInterestTotal = // Total earnings
          (investmentAmount * ((1 + monthlyInterest) ** monthsCount - 1)) /
          monthlyInterest;
        totalInvestment = investmentAmount * monthsCount;
      } else {
        investmentAndInterestTotal =
          investmentAmount * (1 + monthlyInterest) ** monthsCount;
        totalInvestment = investmentAmount;
      }
      totalInterest = investmentAndInterestTotal - totalInvestment;
      break;
    }
  }

  return {
    contribution: contributionRounded,
    totalInvestment,
    totalInterest,
    investmentAndInterestTotal,
  };
};

interface InflationAdjustedParams {
  futureValue: number;
  inflationRate: number;
  duration: number;
}

/**
 * Calculate the inflation adjusted present value of investment value
 * @param {Object} params Params
 * @param {number} params.futureValue Future investment value
 * @param {number} params.inflationRate Annual rate of inflation in percentage
 * @param {number} params.duration Number of years
 * @returns {number} Inflation adjusted present value
 */
export const calculateInflationAdjustedValue = ({
  futureValue,
  inflationRate,
  duration,
}: InflationAdjustedParams): number => {
  if (isNaN(futureValue) || isNaN(inflationRate) || isNaN(duration))
    throw new Error(`One or more input parameters are not valid numbers`);

  const inflationRateDecimal = inflationRate / 100;
  const currentValue = futureValue / (1 + inflationRateDecimal) ** duration;
  return currentValue;
};
