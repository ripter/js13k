

/**
 * Returns a Map containing every map in the list with a conflicting key.
 * aka tile collision.
 * @param       {[Map]} mapList  array of maps to AND together.
 */
export function logicANDMaps(...mapList) {
  // Count the number of maps in the list has each key.
  // Any keys with a count === mapList.length are returned.
  const countOfMatches = new Map();

  // Check each map in the list.
  mapList.forEach(map => map.forEach((entities, key) => {
    if (!countOfMatches.has(key)) {
      countOfMatches.set(key, 0);
    }
    // +1 the existing count
    countOfMatches.set(key, countOfMatches.get(key) + 1);
  }));

  // For each key that exists in all the maps,
  // merge all the entities into the result map.
  const result = new Map();
  countOfMatches.forEach((count, key) => {
    if (count !== mapList.length) { return; }
    const entities = new Set();
    mapList.forEach(map => {
      map.get(key).forEach(entity => {
        entities.add(entity);
      });
    });
    result.set(key, entities);
  });

  return result;
}
