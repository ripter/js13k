


/**
 * Creates all the entities in the map.
 * @param {[[2dArray]]} map  2d array. Value is the id of the entity to create.
 */
export function addMap(map) {
  for (let y=0; y < map.length; y++) {
    for (let x=0; x < map[0].length; x++) {
      const entityID = mapValues[map[y][x]];
      const entity = entityID(x, y);
      if (entity) {
        window.ENTITIES.push(entity);
      }
    }
  }
}

const mapValues = [
  // 0 is empty, no entity.
  () => (null),
  // 1 is green compactor jaws.
  (tileX, tileY) => ({
    tileID: 104,
    color: 'green',
    x: (tileX*8),
    y: (tileY*8),
    rotate: 90*Math.PI/180,
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 2 is green compactor top-left.
  (tileX, tileY) => ({
    tileID: 0,
    color: 'green',
    x: (tileX*8),
    y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 3 is green compactor bottom-left.
  (tileX, tileY) => ({
    tileID: 28, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 4 is green compactor top.
  (tileX, tileY) => ({
    tileID: 1, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 5 is green compactor top-right.
  (tileX, tileY) => ({
    tileID: 3, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 6 is green compactor bottom-right.
  (tileX, tileY) => ({
    tileID: 31, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 7 is cyan track horizontal left.
  (tileX, tileY) => ({
    tileID: 40, color: 'cyan',
    x: (tileX*8), y: (tileY*8),
    pushX: -1, pushY: 0,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
  // 8 is cyan track turned left-up.
  (tileX, tileY) => ({
    tileID: 39, color: 'cyan', rotate: Math.PI,
    x: (tileX*8), y: (tileY*8),
    pushX: -1, pushY: 0,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
  // 9 is cyan track turned left-down.
  (tileX, tileY) => ({
    tileID: 39, color: 'cyan', rotate: -90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    pushX: -1, pushY: 0,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
  // 10 is cyan track vertical down.
  (tileX, tileY) => ({
    tileID: 40, color: 'cyan', rotate: 90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    pushX: 0, pushY: 1,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
  // 11 is cyan track vertical up.
  (tileX, tileY) => ({
    tileID: 40, color: 'cyan', rotate: 90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    pushX: 0, pushY: -1,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
  // 12 is cyan track turned up-right.
  (tileX, tileY) => ({
    tileID: 39, color: 'cyan',
    x: (tileX*8), y: (tileY*8),
    pushX: -1, pushY: 0,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
  // 13 is cyan track turned down-right.
  (tileX, tileY) => ({
    tileID: 39, color: 'cyan', rotate: 90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    pushX: 0, pushY: -1,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
  // 14 is cyan track horizontal right.
  (tileX, tileY) => ({
    tileID: 40, color: 'cyan',
    x: (tileX*8), y: (tileY*8),
    pushX: 1, pushY: 0,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
  // 15 is cyan track turned right-down.
  (tileX, tileY) => ({
    tileID: 39, color: 'cyan', rotate: -90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    pushX: 0, pushY: 1,
    components: new Set([
      'sprite', 'pusher',
    ]),
  }),
];
