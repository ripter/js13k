
export const mapValues = [
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
      'sprite', 'solid', 'jaw',
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
  // 7 is the compact button
  (tileX, tileY) => ({
    tileID: 48, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'push-button'
    ]),
  }),
  // 8 is the moving wall
  (tileX, tileY) => ({
    tileID: 104, color: 'green',
    rotate: -90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'crush-wall', 'jaw',
    ]),
  }),
  // 9 is vertical with wall on the right side.
  (tileX, tileY) => ({
    tileID: 104, color: 'green',
    rotate: -90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'jaw', 'collect-wall-jaw',
    ]),
  }),
  // 10 is a retracting wall
  (tileX, tileY) => ({
    tileID: 1, color: 'red',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'retract-wall',
    ]),
  }),
  // 11 is a hidden jaw that moves trash into the collection area.
  (tileX, tileY) => ({
    tileID: 1, color: 'green',
    // tileID: 104, color: 'yellow',
    // rotate: 180*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'wall-jaw-vertical',
    ]),
  }),
];
