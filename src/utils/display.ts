/**
 * Comma seperated amount in en-IN locale format
 * @param {number} amount Amount
 * @returns {string} Comma seperated amount
 */
export const amountINRWithComma = (
  amount: number,
  showDecimal = false
): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Input must be a valid number.");
  }
  const isDecimal = amount.toString().includes(".");
  const formattedAmount = new Intl.NumberFormat("en-IN", {
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
}: CurrencyInWords): string => {
  let inWords = "",
    shortWord = "",
    longWord = "",
    divisor = 1000;

  if (amount <= 99999) {
    shortWord = "K";
    longWord = "Thousand";
  } else if (amount <= 9999999) {
    shortWord = "L";
    longWord = "Lakh";
    divisor = 100000;
  } else {
    shortWord = "Cr";
    longWord = "Crore";
    divisor = 10000000;
  }

  inWords = `${(amount / divisor).toFixed(decimalCount)}${
    shortName ? shortWord : ` ${longWord}`
  }`;

  return inWords;
};
