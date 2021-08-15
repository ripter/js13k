


/**
 * Checks if entity1's delta will cause it to collide with entity2.
 * @returns True if entity1's delta will cause it to touch entity2.
*/
export function willCollide(entity1, entity2) {
  return collisionAABB({
    x: entity1.x + entity1.deltaX,
    y: entity1.y + entity1.deltaY,
  }, entity2);
}

/**
 * axis-aligned bounding box collision test.
*/
export function collisionAABB(entity1, entity2) {
  return (entity1.x < (entity2.x+8) && (entity1.x+8) > entity2.x) &&
         (entity1.y < (entity2.y+8) && (entity1.y+8) > entity2.y);
}
