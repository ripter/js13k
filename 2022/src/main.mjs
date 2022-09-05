import { svg } from './svg.mjs';
import { SCENES } from './stages.mjs';
import { dialogClick } from './dialogClick.mjs';
import { loadScene } from './loadScene.mjs';

const state = {
	dialogIdx: 0, 
  isDialogOpen: false,
};

// Load the first scene.
loadScene(state, SCENES[0]);
console.log('state', state);

// Main Event Handler for the entire game.
// Every event starts here, and then is dispatched to specific functions.
const GameEventHandler = {
  handleEvent(evt) {
    const { target, type } = evt;
    const { nextAction } = state;
    console.log(type, target);    
    
    switch (type) {
      case 'click':
        if (nextAction === 'dialog') {
          dialogClick(state);
        }
        break;
      default:
        // Ignore the event.
    }
  }
};


// Click Anywhere
svg.addEventListener('click', GameEventHandler);



/*
import { Entity, addEntity } from './entities.mjs';
import { STAGES } from './stages.mjs';
import { StageGen } from './systems/stage.mjs';
import { CardGen } from './systems/card.mjs';
import { AnimationGen } from './systems/animation.mjs';
import { BindGen } from './systems/bind.mjs';

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
  BindGen(),
  StageGen(STAGES),
  AnimationGen(), // Animate before rendering so the positions are correct.
  // Rendering Generators
  // MobGen(),
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

*/