import { parsePath } from './parsePath.mjs';

/**
 * Set a value in an object based on a path.
 * @param {Object} obj - The object to set the value in.
 * @param {string} path - The path where the value should be set.
 * @param {*} value - The value to set.
 * 
 * @example:
 * const obj = {};
 * set(obj, 'filterGroups[7].filters', "value");
 * console.log(obj); // Output: { filterGroups: [ , , , , , , , { filters: "value" } ] }
 */
export function set(obj, path, value) {
  const parsedPath = parsePath(path);

  let current = obj;

  for (let i = 0; i < parsedPath.length; i++) {
    const key = parsedPath[i];

    if (i === parsedPath.length - 1) {
      current[key] = value;
    } else if (!current[key] || typeof current[key] !== 'object') {
      // If it's a number, then create an array, otherwise create an object
      current[key] = typeof parsedPath[i + 1] === 'number' ? [] : {};
    }

    current = current[key];
  }
  return obj;
}
