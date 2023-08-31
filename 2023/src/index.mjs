import { loadJSON } from './loadJson.mjs';
import { Player } from './Player.mjs';

import { EVENT_SELECTED } from './elements/scenario-picker.mjs';
import './elements/scenario-card.mjs';
import './elements/dice-icon.mjs';

const CLASS_ACTIVE = '--active';

const { elmScenarioPicker, elmScenarioCard } = window;


// Create the Player State
const playerState = new Player();
window.playerState = playerState;


// Load the list of Scenarios.
const scenarioList = await loadJSON('scenarios/index.json');
elmScenarioPicker.options = scenarioList;

//
// On Scenario Picked
// Load the Tribe and the first Active Card.
elmScenarioPicker.addEventListener(EVENT_SELECTED, async (evt) => {
  const selectedOption = evt.detail;
  // Load the Tribe Data
  await playerState.loadFreshTribe(`scenarios/${selectedOption.src}`);
  // Load a random Card to start.
  await playerState.loadRandomCard();

  elmScenarioCard.playerState = playerState;
  elmScenarioCard.card = playerState.card;

  elmScenarioPicker.classList.remove(CLASS_ACTIVE);
  elmScenarioCard.classList.add(CLASS_ACTIVE);
  console.log('playerState', playerState, '\nevent', evt);
});
