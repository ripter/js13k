

/**
 * Returns a Set that has all the components in either list.
 * Components inside each list are an AND.
 * Each list is an OR.
 * @param  {[string]} list1
 * @param  {[string]} list2
 * @return {Set}
 */
export function byComponents(list1, list2) {
  const set1 = byAllComponents(list1);
  const set2 = byAllComponents(list2);
  const result = new Set();
  const merge = (entity) => result.add(entity);
  set1.forEach(merge);
  set2.forEach(merge);
  return result;
}

/**
 * Returns a Set of all the entities that have every component in the list.
 * @param  {[string]} list
 * @return {Set}
 */
export function byAllComponents(list) {
  if (!list || list.length === 0) { return new Set(); }
  const cacheKey = `byComponents(${JSON.stringify(list)})`;

  // if it's in the cache, return it.
  if (window.CACHE_MAP.has(cacheKey)) {
    return window.CACHE_MAP.get(cacheKey);
  }

  // Find all the entities with the required components.
  const entities = window.ENTITIES.reduce((acc, entity) => {
    const doesMatch = list.every(component => entity.components.has(component));
    if (doesMatch) {
      acc.add(entity);
    }
    return acc;
  }, new Set());

  // Add it to the cache and return.
  window.CACHE_MAP.set(cacheKey, entities);
  return entities;
}
