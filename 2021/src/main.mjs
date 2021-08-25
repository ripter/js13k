import { addColorImage } from './canvas/addColorImage.mjs';
import { addMap } from './entities/addMap.mjs';
import { addTrashBlock } from './entities/addTrashBlock.mjs';
import { createRandomTrashBlocks } from './utils/createRandomTrashBlocks.mjs';
import { inputSystem } from './systems/inputSystem.mjs';
import { spriteSystem } from './systems/spriteSystem.mjs';


// create colored sprite sheets.
addColorImage('black', [0x00, 0x00, 0x00]);
addColorImage('dark_gray', [0x55, 0x55, 0x55]);
addColorImage('blue', [0x00, 0x00, 0xAA]);
addColorImage('light_blue', [0x55, 0x55, 0xFF]);
addColorImage('green', [0x00, 0xAA, 0x00]);
addColorImage('light_green', [0x55, 0xFF, 0x55]);
addColorImage('cyan', [0x00, 0xAA, 0xAA]);
addColorImage('light_cyan', [0x55, 0xFF, 0xFF]);
addColorImage('red', [0xAA, 0x00, 0x00]);
addColorImage('light_red', [0xFF, 0x55, 0x55]);
addColorImage('magenta', [0xAA, 0x00, 0xAA]);
addColorImage('light_magenta', [0xFF, 0x55, 0xFF]);
addColorImage('brown', [0xAA, 0x55, 0x00]);
addColorImage('yellow', [0xFF, 0xFF, 0x55]);
addColorImage('light_gray', [0xAA, 0xAA, 0xAA]);
addColorImage('white', [0xFF, 0xFF, 0xFF]);



window.IS_RUNNING = true;
// list of all entities in the game.
window.ENTITIES = [
  // Player
  {
    id: 'player',
    tileID: 5,
    color: 'light_magenta',
    x: 8, y: 8,
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'movable', 'solid', 'pusher'
    ]),
  },
];
// keep a cache of the entity maps used each tick.
window.CACHE_MAP = new Map();


addMap([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 4, 4, 4, 4, 4, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);



// Areas that can spawn a trash block.
[
  [ 1, 2,  3, 3],
  [ 2,13,  2,18],
  [13, 2, 30, 8],
  [13, 2, 30, 8],
  [13, 2, 30, 8],
  [13, 2, 30, 8],
  [13, 2, 30, 8],
  [13,11, 30,18],
  [13,11, 30,18],
  [13,11, 30,18],
  [13,11, 30,18],
  [13,11, 30,18],
].forEach(range => {
  const [minX, minY, maxX, maxY] = range;
  const x = 0|Math.random() * (maxX - minX + 1) + minX;
  const y = 0|Math.random() * (maxY - minY + 1) + minY;
  addTrashBlock(x, y, createRandomTrashBlocks());
});

addTrashBlock(0, 0, [[46, 'red', 0, 0]])


// Get the 2d Context
window.ctx = window.c.getContext('2d');

// Game loop
let lastTime = 0;
(function gameLoop() {
  let currentTime = Date.now();
  let delta = (currentTime - lastTime) / 1000;

  // Run the systems.
  [
    () => window.ctx.clearRect(0, 0, window.c.width, window.c.height),
    () => window.CACHE_MAP.clear(),
    inputSystem,
    spriteSystem,
  ].forEach(system => system(delta));

  lastTime = currentTime;
  // loop as long as the game is running.
  // global for easy debugging on the console.
  if (window.IS_RUNNING) {
    window.requestAnimationFrame(gameLoop);
  }
})();
