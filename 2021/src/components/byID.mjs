

/**
 * Returns the entity by ID.
*/
export function byID(id) {
  return window.ENTITIES.find(entity => entity.id === id);
}
