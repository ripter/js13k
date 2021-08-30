
/**
 * Converts the Set into a Map.
 * @param {Set} set
 * @param {(item) => string} keyFn
 */
export function setToMapByKey(set, keyFn) {
  const map = new Map();

  for(let value of set) {
    const key = keyFn(value);
    if (!map.has(key)) {
      map.set(key, new Set());
    }

    const valueSet = map.get(key);
    valueSet.add(value);
    map.set(key, valueSet);
  }

  return map;
}
