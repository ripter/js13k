

/**
 * @returns True if the two entities are touching.
*/
export function isTouching(entity1, entity2) {

  return ((entity1.x+4) >= entity2.x && (entity1.x-4) <= (entity2.x+8))
    && ((entity1.y+4) >= entity2.y && (entity1.y-4) <= (entity2.y+8));
}
