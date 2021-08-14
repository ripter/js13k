

/**
 * Returns all the entities found by ID.
 * @returns Map
*/
export function byIDs(list) {
  return window.ENTITIES.reduce((acc, entity) => {
    const matchedID = list.find(id => entity.id === id);
    if (matchedID) {
      acc.set(matchedID, entity);
    }
    return acc;
  }, new Map());
}
