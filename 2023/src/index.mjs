import { dispatchLoadTribe } from './state/dispatchLoadTribe.mjs';

import { loadJSON } from './loadJson.mjs';


import { EVENT_SELECTED } from './elements/scenario-picker.mjs';
import './elements/panel-player.mjs';
import './elements/panel-card.mjs';
import './elements/dice-icon.mjs';
import './elements/dice-list.mjs';


const { elmScenarioPicker } = window;

// Load the list of Tribes.
const tribeList = await loadJSON('tribes/index.json');
elmScenarioPicker.options = tribeList;
// When the use picks a Tribe
window.elmScenarioPicker.addEventListener(EVENT_SELECTED, async (evt) => {
  const selectedOption = evt.detail;
  // Load the Tribe Data
  dispatchLoadTribe(selectedOption.src);
});
