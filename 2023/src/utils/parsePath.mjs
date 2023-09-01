/**
 * 
 * @example:
 *  const path = 'filterGroups[7].filters';
    const parsedPath = parsePath(path);
    console.log(parsedPath); // Output: ['filterGroups', 7, 'filters']
 */
export function parsePath(path) {
  const regex = /(\w+)|\[(\d+)\]/g;
  const result = [];
  let match;

  while ((match = regex.exec(path))) {
    if (match[1]) {
      result.push(match[1]);
    } else if (match[2]) {
      result.push(parseInt(match[2]));
    }
  }

  return result;
}