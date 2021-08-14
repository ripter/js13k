

/**
 * @param list - list of components
 * @returns array of entities that have every component listed.
*/
export function byComponents(list) {
  return window.ENTITIES.reduce((acc, entity) => {
    const doesMatch = list.every(component => entity.components.has(component));
    if (doesMatch) {
      acc.push(entity);
    }
    return acc;
  }, []);
}
