

// Returns the entity's x,y key used in maps.
// optional delta.
export function getKey(entity, tileDeltaX=0, tileDeltaY=0) {
  const x = 0| (entity.x/8);
  const y = 0| (entity.y/8);
  return `${x+tileDeltaX},${y+tileDeltaY}`;
}
