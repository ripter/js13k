

/**
 * Finds all the items in the set that collide when the two key functions are compared.
 */
export function getCollisionsByFunction(set, fnGetKey1, fnGetKey2) {
  return Array.from(set.values()).filter(entity => fnGetKey1(entity) === fnGetKey2(entity));
}

/**
 * Finds all the items in the set that have the same key value.
 */
export function getCollisionByKey(key2, fnGetKey1, set) {
  return getCollisionsByFunction(set, fnGetKey1, () => key2);
}
