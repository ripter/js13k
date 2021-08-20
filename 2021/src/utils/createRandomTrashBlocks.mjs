

/**
 * Creates array that can be used with addTrashBlock to create a multi-block trash item.
 * @return [[tileID, color, tileOffsetX, tileOffsetY, rotation], ...]
 */
export function createRandomTrashBlocks() {
  const shape = shapes[0|Math.random()*shapes.length];
  const result = [];

  for (let i=0; i < shape.length; i += 2) {
    result.push([
      randomTrashTile(),
      colors[0|Math.random()*colors.length],
      shape[i],
      shape[i+1],
    ]);
  }

  return result;
}

/**
 * Returns a random trash tile.
 */
function randomTrashTile() {
  const illegalTiles = [0,1,3,5,15,28,31,39,40,104];
  let result;
  do {
    result = 0|Math.random()*140;
  }
  while (illegalTiles.includes(result));
  return result;
}

const colors = [
  // 'dark_gray',
  // 'blue',
  'light_blue',
  'light_green',
  'light_cyan',
  'red',
  'light_red',
  'magenta',
  'brown',
  'yellow',
  'light_gray',
  'white',
];

const shapes = [
  [0,0, 0,1],
  [0,0, 1,0],
  [0,0, 1,0, 2,0],
  [0,0, 0,1, 0,2],
  [0,0, 0,1, 1,1],
  [0,0, 1,0, 1,1],
  [0,0, 1,0, 0,1, 1,1],
  [0,0, 0,1, 0,2, 1,0],
  [0,0, 1,0, 1,1, 2,1],
]
