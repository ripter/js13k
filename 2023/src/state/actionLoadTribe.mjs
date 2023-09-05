import { actionCreateOpponents } from './actionCreateOpponents.mjs';
import { actionLoadCard } from './actionLoadCard.mjs';
import { loadJSON } from '../utils/loadJSON.mjs';

/**
 * Resets the entire game state from a tribe config.
 * A Tribe config file is the inital game state.
 */
export async function actionLoadTribe(state, tribeOption) {
  const { src, description } = tribeOption;

  // Here, we overwrite the original state object with the new state
  // from the loaded JSON
  Object.assign(state, await loadJSON(`tribes/${src}`));

  // Hydrate the config file into the full state.
  state.numberOfSidesOnDice = state.diceValues.length;
  state.player.dice = [];
  state.opponents = [];
  state.currentActorPath = 'player';
  state.seasonCount = 1; // Number of Season's the User has seen so far.
  state.gameLog = [];

  // Create Opponents
  await actionCreateOpponents(state, 1); // Note: I've removed the "await" since the function doesn't appear to be async
  // Load the first card.
  await actionLoadCard(state, description); // Again, removed "await" based on the original code.
}
