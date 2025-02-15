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
 * Omit the first word of a sentence
 * @param {string} words Sentence
 * @returns {string} First word of the sentence
 */
export const omitFirstWord = (words: string): string => {
  const wordsArr = words.split(" ");
  wordsArr.shift();
  return wordsArr.join(" ");
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
