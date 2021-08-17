import { getKey } from './key.mjs';

/**
 * Creates a Map from and entity list.
 * The Entity x,y position is used as the map key.
*/
export function createEntityMap(entities) {
  const map = new Map();

  // Place each entity on the map
  entities.forEach(entity => {
    map.set(getKey(entity), entity);
  });

  return map;
}
