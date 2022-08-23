import './entities.mjs';
import { ctx } from './canvas.mjs';
import { StageGen } from './systems/stage.mjs';

// Load Custom Fonts
const fontJost = new FontFace('jost', 'url(./fonts/Jost-700-Bold.ttf)');
await fontJost.load();
document.fonts.add(fontJost);


// Setup Systems.
const systems = [
  StageGen([
    'Home',
    'Ouside Home',
    'Train Station',
    'Untaingled',
    'Cleaning',
    'Sorting',
  ]),
];


// Let the game run, this acts as an emergency stop while debugging.
window.IS_RUNNING = true;
// Game loop
let lastTime = 0;
(function gameLoop() {
  let currentTime = Date.now();
  let delta = (currentTime - lastTime) / 1000;

  // Run the systems.
  // Each one is a generator instance.
  systems.forEach(system => system.next({delta}));

  lastTime = currentTime;
  // loop as long as the game is running.
  // global for easy debugging on the console.
  if (window.IS_RUNNING) {
    window.requestAnimationFrame(gameLoop);
  }
})();
