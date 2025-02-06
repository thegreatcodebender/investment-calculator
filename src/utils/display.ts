/**
 * Comma seperated amount in en-IN locale format
 * @param {number} amount Amount
 * @returns {string} Comma seperated amount
 */
export const amountINRWithComma = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Input must be a valid number.");
  }
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
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
