import { actionCreateOpponents } from './actionCreateOpponents.mjs';
import { actionLoadCard } from './actionLoadCard.mjs';
import { actionRollDice } from './actionRollDice.mjs';
import { loadJSON } from '../loadJson.mjs';

/**
 * Resets the entire game state from a tribe config.
 * A Tribe config file is the inital game state.
 */
export async function actionLoadTribe(_, tribeURL) {
  let state = await loadJSON(`tribes/${tribeURL}`);

  // Hydrate the config file into the full state.
  state.numberOfSidesOnDice = state.diceValues.length;
  state.player.dice = [];
  state.opponents = [];

  // Create Opponents
  state = actionCreateOpponents(state, 2);

  // Roll the dice!
  state = actionRollDice(state, 'player');
  for (let i = 0; i < state.opponents.length; i++) {
    state = actionRollDice(state, `opponents[${i}]`);
}

  // Load the first card. 
  state = await actionLoadCard(state);

  return state;
}
