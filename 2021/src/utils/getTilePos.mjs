

/**
 * Returns tile position and delta tile position.
*/
export function getTilePos(entity) {
  const x = 0| (entity.x/8);
  const y = 0| (entity.y/8);
  const key = `${x},${y}`;
  const nextX = x + entity.deltaX;
  const nextY = y + entity.deltaY;
  const nextKey = `${nextX},${nextY}`;

  return {
    key, x, y,
    nextKey, nextX, nextY,
  }
}
