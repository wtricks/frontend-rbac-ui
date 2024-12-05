/**
 * Checks if any element of the array matches any element of the match array.
 * @param {string[]} arr - The array to check.
 * @param {string[]} match - The array of elements to match.
 * @returns {boolean} true if any element of the array matches any element of the match array.
 */
export const anyMatch = (arr: string[], match: string[]): boolean => {
  return match.some((item) => arr.some((i) => i === item));
}

/**
 * Checks if an array contains a specific element.
 * @param {string[]} arr - The array to search.
 * @param {string} match - The element to search for.
 * @returns {boolean} true if the array contains the element.
 */
export const matchArray = (arr: string[], match: string): boolean => {
  return arr.includes(match);
}
