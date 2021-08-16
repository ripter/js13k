import { getKey } from './key.mjs';

/**
 * Creates a collision map by creating a map of everyone's delta.
 * Collision is where two different entities create the same key when both have delta applied.
*/
export function createCollisionMap(map1, map2) {
  const collisionMap = new Map();

  map1.forEach(entity1 => {
    map2.forEach(entity2 => {
      // skip self
      if (entity1 === entity2) { return; }
      const key1 = getKey(entity1, entity1.deltaX, entity1.deltaY);
      const key2 = getKey(entity2, entity2.deltaX, entity2.deltaY);
      // We only care about colliding names.
      if (key1 !== key2) { return; }

      // Mark them as colliding
      collisionMap.set(key1, new Set([
        entity1,
        entity2,
      ]));
    });
  });

  return collisionMap;
}
