
/**
 * Creates a new string with the chars from both strings.
 * @param  {string} str1               [description]
 * @param  {string} str2               [description]
 * @return {string} New string with the same length as str1.
 */
export function zipString(str1, str2) {
  return str1.split('').map((d, i) => `${str2[i]}${d}`).join('');
}
window.zipString = zipString;
