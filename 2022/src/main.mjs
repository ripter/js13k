import { svg } from './svg.mjs';
import { SCENES } from './stages.mjs';
import { dialogClick } from './dialogClick.mjs';
import { actionClick } from './actionClick.mjs';
import { loadScene } from './loadScene.mjs';

const state = {
  money: 10, 
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
        if (state.isDialogOpen) {
          dialogClick(state);
        }
        else {
          const elmItem = target.closest('.clickable');
          if (!elmItem) return;
          if (elmItem.classList.contains('item')) {
            actionClick(state, state.items[elmItem.id]);
          }
          // itemClick(elmItem.id, state);
          // actionClick(state,)
        }
        break;
      default:
        // Ignore the event.
    }
  }
};


// Click Anywhere
svg.addEventListener('click', GameEventHandler);



