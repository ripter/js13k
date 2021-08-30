
/**
 * Moves a set of entities by tile offset.
 */
export function moveEntities(entities, tileOffsetX, tileOffsetY) {
  if (!entities) { return; }
  for (let entity of entities) {
    entity.x += tileOffsetX * 8;
    entity.y += tileOffsetY * 8;
  }
}
