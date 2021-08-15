

/**
 * @param entity - Sprite Entity with x,y in pixels.
 * @param deltaX - tile delta to use for nextKey
 * @param deltaY - tile delta to use for nextKey
*/
export function getPosKey(entity, deltaX, deltaY) {
  const x = 0| (entity.x/8);
  const y = 0| (entity.y/8);

  return {
    key: `${x},${y}`,
    deltaKey: `${x+deltaX},${y+deltaY}`,
  }
}
