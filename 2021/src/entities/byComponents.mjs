import { getKey, getDeltaKey } from '../utils/key.mjs';

export function byComponents(list) {
  const cacheKey = `byComponents(${JSON.stringify(list)})`;

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

  window.CACHE_MAP.set(cacheKey, entities);
  return entities;

  // Add them to the result map using the key function.
  // entities.forEach(entity => {
  //   const key = useDelta ? getDeltaKey(entity) : getKey(entity);
  //   // if it's not in result yet, create an empty set to hold all the entities.
  //   if (!result.has(key)) {
  //     result.set(key, new Set());
  //   }
  //   // Add the entity to the set.
  //   const set = result.get(key);
  //   set.add(entity);
  // });
  // // entities.forEach(entity => result.set(useDelta ? getDeltaKey(entity) : getKey(entity), entity))
  // return result;
}
