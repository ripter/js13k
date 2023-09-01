import { stateReducer } from './stateReducer.mjs';
import { initialState } from './initialState.mjs';

/** 
 * Current game state.
 * @type {Object}
 */
export let currentState = initialState();

/**
 * Dispatches an action to update the game state.
 * @function
 * @async
 * @param {Object} action - The action object to dispatch. Typically contains a `type` property.
 * @returns {Promise<Object>} - Returns a promise that resolves to the updated state.
 */
export async function dispatch(action) {
  // Run the State Reducer
  const nextState = await stateReducer(currentState, action);
  // if the reference didn't change, then do nothing.
  if (nextState === currentState) { return; }
  // Save the new reference.
  currentState = nextState;
  window.gameState = currentState;
  // Return the updated state. 
  return nextState;
}
