
/**
 * Deletes all the entities with the component.
 * @param  {string} component
 */
export function deleteWithComponent(component) {
  window.ENTITIES = window.ENTITIES.filter(entity => !entity.components.has(component));
}
