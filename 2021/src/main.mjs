import { addColorImage } from './canvas/addColorImage.mjs';
import { inputSystem } from './systems/inputSystem.mjs';
import { spriteSystem } from './systems/spriteSystem.mjs';
import { physicsSystem } from './systems/physicsSystem.mjs';
import { groupSpriteSystem } from './systems/groupSpriteSystem.mjs';
/**
 * POC One: user input moves around player sprite.
 * Step 1: render player sprite.
*/

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
  // create the player entity and components.
  {
    id: 'player',
    tileID: 5,
    color: 'cyan',
    x: 50, y: 50,
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'movable',
    ]),
  },
  {
    id: 'trash_1',
    x: 100, y: 100,
    sprites: [
      'trash_piece_0',
      'trash_piece_1',
      'trash_piece_2',
    ],
    components: new Set([
      'sprite_group',
    ]),
  },
  {
    id: 'trash_piece_0',
    tileID: 99,
    color: 'brown',
    offset_x: 0, offset_y: 0,
    components: new Set([
      'sprite',
    ]),
  },
  {
    id: 'trash_piece_1',
    tileID: 100,
    color: 'brown',
    offset_x: 8, offset_y: 0,
    components: new Set([
      'sprite',
    ]),
  },
  {
    id: 'trash_piece_2',
    tileID: 95,
    rotate: 90 * Math.PI / 180,
    color: 'red',
    offset_x: 0, offset_y: 8,
    components: new Set([
      'sprite',
    ]),
  },
];


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
    physicsSystem,
    groupSpriteSystem,
    spriteSystem,
    inputSystem,
  ].forEach(system => system(delta));

  lastTime = currentTime;
  // loop as long as the game is running.
  // global for easy debugging on the console.
  if (window.IS_RUNNING) {
    window.requestAnimationFrame(gameLoop);
  }
})();
