

/*
 * Creates 2d array with each entity in it's tile position.
 * All tiles are 8x8 pixels
*/
export function createEntityTable(entities) {
  const tileWidth = window.c.width / 8;
  const tileHeight = window.c.height / 8;
  // const map = (new Array(tileHeight).fill(0)).map(() => new Array(tileWidth).fill(false));
  const map = new Map();

  // Place each entity on the map
  entities.forEach(entity => {
    const tileX = 0| (entity.x/8);
    const tileY = 0| (entity.y/8);
    map.set(`${tileX},${tileY}`, entity);
  });

  return map;
}
