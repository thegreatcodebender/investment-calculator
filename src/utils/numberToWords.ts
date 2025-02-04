/**
 * Omit the first word of a sentence
 * @param {string} words Sentence
 * @returns {string} First word of the sentence
 */
export const omitFirstWord = (words: string) => {
  const wordsArr = words.split(" ");
  wordsArr.shift();
  return wordsArr.join(" ");
};
