import { actionCreateOpponents } from './actionCreateOpponents.mjs';
import { actionLoadCard } from './actionLoadCard.mjs';
import { actionRollDice } from './actionRollDice.mjs';
import { loadJSON } from '../utils/loadJSON.mjs';

/**
 * Resets the entire game state from a tribe config.
 * A Tribe config file is the inital game state.
 */
export async function actionLoadTribe(_, tribeOption) {
  const { src, description } = tribeOption;
  let state = await loadJSON(`tribes/${src}`);

  // Hydrate the config file into the full state.
  state.numberOfSidesOnDice = state.diceValues.length;
  state.player.dice = [];
  state.opponents = [];
  state.currentActorPath = 'player';
  state.season = 1;
  state.gameLog = [];

  // Create Opponents
  state = actionCreateOpponents(state, 1);

  // Load the first card. 
  state = await actionLoadCard(state, description);

  return state;
}
