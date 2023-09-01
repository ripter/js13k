import { dispatchLoadTribe } from './state/dispatchLoadTribe.mjs';

import { loadJSON } from './loadJson.mjs';
import { Player } from './Player.mjs';



import { EVENT_SELECTED } from './elements/scenario-picker.mjs';
import './elements/scenario-card.mjs';
import './elements/dice-icon.mjs';
import './elements/dice-list.mjs';


const { elmScenarioPicker, elmScenarioCard } = window;


// Create the Player State
const playerState = new Player();
window.playerState = playerState;


// Load the list of Tribes.
const tribeList = await loadJSON('tribes/index.json');
elmScenarioPicker.options = tribeList;

//
// On Scenario Picked
// Load the Tribe and the first Active Card.
elmScenarioPicker.addEventListener(EVENT_SELECTED, async (evt) => {
  const selectedOption = evt.detail;
  // Load the Tribe Data
  dispatchLoadTribe(selectedOption.src);
  // await playerState.loadFreshTribe(`scenarios/${selectedOption.src}`);
  // Load a random Card to start.
  // await playerState.loadRandomCard();

  // playerState.rollPopulation();
  // elmScenarioCard.playerState = playerState;
  // elmScenarioCard.card = playerState.card;

  // elmScenarioPicker.classList.remove(CLASS_ACTIVE);
  // elmScenarioCard.classList.add(CLASS_ACTIVE);
  // console.log('playerState', playerState, '\nevent', evt);
});
