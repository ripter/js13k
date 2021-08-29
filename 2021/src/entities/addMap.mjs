import { mapValues } from '../consts/mapValues.mjs';


/**
 * Creates all the entities in the map.
 * @param {[[2dArray]]} map  2d array. Value is the id of the entity to create.
 */
export function addMap(map) {
  for (let y=0; y < map.length; y++) {
    for (let x=0; x < map[0].length; x++) {
      const entityID = mapValues[map[y][x]];
      const entity = entityID(x, y);
      if (entity) {
        window.ENTITIES.push(entity);
      }
    }
  }
}
