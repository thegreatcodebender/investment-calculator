/**
 * Copy text to clipboard
 * @param {string} content
 * @returns {boolean} Boolean state of copy action
 */
export const copyToClipboard = async (
  content: string | number
): Promise<boolean> => {
  let isCopied = false;
  try {
    await navigator.clipboard.writeText(content.toString());
    isCopied = true;
  } catch (error) {
    console.error("Error while copying ", error);
  }
  return isCopied;
};
