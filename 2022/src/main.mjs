import { svg } from './svg.mjs';
import { SCENES } from './stages.mjs';
import { dialogClick } from './clickHandlers/dialogClick.mjs';
import { actionClick } from './clickHandlers/actionClick.mjs';
import { choiceClick } from './clickHandlers/choiceClick.mjs';

const state = {
  money: 0, 
  sceneIndex: 4,
  wifeParts: {
    'Neural Link': 0,
    'Torso': 0,
    'Arms': 0,
    'Legs': 0,
  },
  // Captcha Minigame
  captcha: {
    storyIdx: 0, // Idx of the current paragraph in the story
    wordIdx: 0,  // Idx of the current word in the story.
    runCount: 0, // A count of the current captcha solved during a session. 
    earnings: 0, // The total earned during  session.
    doneIdx: 4, // Scene Index to use when exiting the game.
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
          choiceClick(state, parseInt(clickID.substring(7), 10));
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



