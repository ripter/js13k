import { loadJSON } from '../loadJson.mjs';
import { actionLoadCard } from './actionLoadCard.mjs';
import { actionRollDice } from './actionRollDice.mjs';

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

  // Load the first card. 
  state = await actionLoadCard(state);

  // Roll The Player's dice!
  state = actionRollDice(state, 'player');

  // TODO: Load oppoinents
  return state;
}
