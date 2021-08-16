import { addColorImage } from './canvas/addColorImage.mjs';
import { inputSystem } from './systems/inputSystem.mjs';
import { spriteSystem } from './systems/spriteSystem.mjs';
import { physicsSystem } from './systems/physicsSystem.mjs';
import { groupSpriteSystem } from './systems/groupSpriteSystem.mjs';
import { addTrashBlock } from './entities/addTrashBlock.mjs';
import { addCompactor } from './entities/addCompactor.mjs';


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
    x: 24, y: 24,
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'movable', 'solid', 'pusher'
    ]),
  },
];


// Create the Trash compactor with conveyors
addCompactor(1, 5);


// Create Trash blocks
addTrashBlock(12, 5, [
  [71, 'brown',       0,  0],
  [70, 'light_blue',  0,  1, 45 * Math.PI / 180],
  [71, 'yellow',      0,  2],
]);

addTrashBlock(10, 15, [
  [71, 'brown',       1,  0],
  [70, 'light_blue',  1,  1, 45 * Math.PI / 180],
  [71, 'yellow',      0,  2],
]);

addTrashBlock(15, 10, [
  [36, 'magenta',  1,  1],
]);



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
    inputSystem,
    physicsSystem,
    // groupSpriteSystem,
    spriteSystem,
  ].forEach(system => system(delta));

  lastTime = currentTime;
  // loop as long as the game is running.
  // global for easy debugging on the console.
  if (window.IS_RUNNING) {
    window.requestAnimationFrame(gameLoop);
  }
})();
