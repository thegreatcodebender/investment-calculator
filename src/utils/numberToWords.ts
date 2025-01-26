export const omitFirstWord = (words: string) => {
  const wordsArr = words.split(" ");
  wordsArr.shift();
  return wordsArr.join(" ");
};
