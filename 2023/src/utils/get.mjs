import { parsePath } from './parsePath.mjs';

/**
 * Safely get a value from an object based on a path.
 * @param {Object} obj - The object to get the value from.
 * @param {string} path - The path to the desired value.
 * @param {*} [defaultValue] - The value to return if the path does not exist.
 * @returns {*} The value from the object at the specified path, or defaultValue.
 * 
 * @example:
 * const obj = { filterGroups: [ , , , , , , , { filters: "value" } ] };
 * const value = get(obj, 'filterGroups[7].filters');
 * console.log(value); // Output: "value"
 */
export function get(obj, path, defaultValue = undefined) {
  const parsedPath = parsePath(path);

  let current = obj;

  for (const key of parsedPath) {
    if (current[key] === undefined) {
      return defaultValue;
    }

    current = current[key];
  }

  return current;
}
