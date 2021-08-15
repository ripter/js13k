
/**
 * Returns all the entities found by parentID.
 * @returns Map
*/
export function byParentID(parentID) {
  return window.ENTITIES.reduce((acc, entity) => {
    // const matchedID = list.find(id => entity.parentID === id);
    if (entity.parentID === parentID) {
      acc.add(entity);
    }
    return acc;
  }, new Set());
}
