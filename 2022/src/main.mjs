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
    const { isChoiceOpen, isDialogOpen } = state;
    const elmClicked = target.closest('.clickable');
    const clickID = elmClicked?.id ?? null;
    
    

    console.log(type, target);    
    
    switch (type) {
      case 'click':
        if (isChoiceOpen) {
          const elmText = elmClicked.querySelector(`#${clickID}-text`);
          const text = elmText.innerHTML;
          console.log('Choice clicked', clickID, '\n', elmClicked, '\n', text); 
          actionClick(state, state.choices[text]);
        }
        else if (state.isDialogOpen) {
          dialogClick(state);
        }
        else {
          if (!elmClicked) return;
          actionClick(state, state.items[clickID]);
        }
        break;
      default:
        // Ignore the event.
    }
  }
};


// Click Anywhere
svg.addEventListener('click', GameEventHandler);



