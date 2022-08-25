import { Entity, addEntity } from './entities.mjs';
import { ctx } from './canvas.mjs';
import { STAGES } from './stages.mjs';
import { StageGen } from './systems/stage.mjs';
import { CardGen } from './systems/card.mjs';
import { AnimationGen } from './systems/animation.mjs';
import { MobGen } from './systems/mob.mjs';

// Load Custom Fonts
const fontJost = new FontFace('jost', 'url(./fonts/Jost-700-Bold.ttf)');
await fontJost.load();
document.fonts.add(fontJost);

// Initial Entities.
addEntity(new Entity({
 'load-stage': 'HOME', 
}));


// Setup Systems.
const systems = [
  StageGen(STAGES),
  AnimationGen(), // Animate before rendering so the positions are correct.
  // Rendering Generators
  MobGen(),
  CardGen(),
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
