import { getKey, getDeltaKey } from '../utils/key.mjs';

export function byComponents(list) {
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
