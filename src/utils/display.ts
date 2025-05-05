import { CurrencyLocales } from "../types/currencyContext";

/**
 * Comma seperated amount in en-IN locale format
 * @param {Object} args Argument object
 * @param {number} args.amount Amount
 * @param {boolean} args.showDecimal Controls if decimal needs to shown
 * @param {CurrencyLocales} args.currencyLocale Current currency locale
 * @returns {string} Comma seperated amount
 */
export const currencyWithComma = ({
  amount,
  showDecimal = false,
  currencyLocale = CurrencyLocales.IN,
}: {
  amount: number;
  showDecimal?: boolean;
  currencyLocale?: CurrencyLocales;
}): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Input must be a valid number.");
  }
  const isDecimal = amount.toString().includes(".");
  const formattedAmount = new Intl.NumberFormat(currencyLocale, {
    style: "currency",
    currency: "INR",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
    maximumFractionDigits: isDecimal && showDecimal ? 2 : 0,
  }).format(amount);

  // Remove currency code
  return formattedAmount.split("INR")[1].trim();
};

/**
 * Remove starting, ending and inbetween consecutive commas from the provided string
 * @param {string | number} valueToFormat - Value to remove comma from
 * @returns {string} Comma removed value if it is valid number, else param value
 */
export const removeCommaFromString = (
  valueToFormat: string | number
): string => {
  const formattedValue = valueToFormat
    .toString()
    .replace(/(?!^)(?<!,),(?!,)(?!$)/g, "");

  if (isNaN(Number(formattedValue))) {
    return valueToFormat.toString();
  }

  return formattedValue;
};

interface CurrencyInWords {
  amount: number;
  decimalCount?: number;
  shortName?: boolean;
  currencyLocale: CurrencyLocales;
}

/**
 * Convert currency amount to words of highest value
 * @param amount Amount in number
 * @param decimalCount Number of decimals to be included in the result. Default is 0;
 * @param shortName Whether short name of currency to be included in result. Default is false.
 */
export const currencyInWords = ({
  amount,
  decimalCount = 0,
  shortName = false,
  currencyLocale,
}: CurrencyInWords): string => {
  const isINR = currencyLocale === CurrencyLocales.IN;
  let inWords = "",
    shortWord = "",
    longWord = "",
    divisor = 1;

  if (amount < 100000) {
    shortWord = "K";
    longWord = isINR ? "Thousand" : "Thousand";
    divisor = 1000;
  } else if (amount < 10000000) {
    shortWord = isINR ? "L" : "HK";
    longWord = isINR ? "Lakhs" : "Hundred Thousand";
    divisor = 100000;
  } else if (amount < 10000000000) {
    shortWord = isINR ? "Cr" : "M";
    longWord = isINR ? "Crores" : "Million";
    divisor = 10000000;
  } else if (amount < 1000000000000) {
    shortWord = isINR ? "KCr" : "TenB";
    longWord = isINR ? "Thousand Crores" : "Ten Billion";
    divisor = 10000000000;
  } else {
    shortWord = isINR ? "LCr" : "T";
    longWord = isINR ? "Lakh Crores" : "Trillion";
    divisor = 1000000000000;
  }

  inWords = `${(amount / divisor).toFixed(decimalCount)} ${
    shortName ? shortWord : longWord
  }`;

  return inWords;
};
