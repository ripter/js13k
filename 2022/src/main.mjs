import { svg } from './svg.mjs';
import { SCENES } from './stages.mjs';
import { dialogClick } from './dialogClick.mjs';
import { actionClick } from './actionClick.mjs';

const state = {
  money: 10, 
  sceneIndex: 2,
  wifeParts: {
    'Neural Link': 0,
    'Torso': 0,
    'Arms': 0,
    'Legs': 0,
  },
};

// Load the first scene.
actionClick(state, state.sceneIndex);
console.log('state', state);

// Main Event Handler for the entire game.
// Every event starts here, and then is dispatched to specific functions.
const GameEventHandler = {
  handleEvent(evt) {
    const { target, type } = evt;
    const { isChoiceOpen, isDialogOpen } = state;
    const elmClicked = target.closest('.clickable');
    const clickID = elmClicked?.id ?? null;

    switch (type) {
      case 'click':
        if (isChoiceOpen && clickID) {
          const elmText = elmClicked.querySelector(`#${clickID}-text`);
          const text = elmText.innerHTML;
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



