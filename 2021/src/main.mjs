import { addColorImage } from './canvas/addColorImage.mjs';
import { spriteSystem } from './systems/spriteSystem.mjs';
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
    x: 50,
    y: 50,
    color: 'cyan',
    components: new Set([
      'sprite',
    ]),
  }
];


// Get the 2d Context
window.ctx = window.c.getContext('2d');

// Game loop
(function gameLoop() {

  // Run the systems.
  [
    () => window.ctx.clearRect(0, 0, window.c.width, window.c.height),
    spriteSystem,
  ].forEach(system => system());

  // loop as long as the game is running.
  // global for easy debugging on the console.
  if (window.IS_RUNNING) {
    window.requestAnimationFrame(gameLoop);
  }
})();
