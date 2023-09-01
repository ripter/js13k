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
  if (nextState === currentState) { return currentState; }
  // Save the new reference.
  currentState = nextState;
  window.gameState = currentState;
  // Return the updated state. 
  return nextState;
}

// IDEA:
//  stateReducer might not be needed at all. 
//  action.type is a string that tells stateReducer which action function to use.
//  We could cut out the middleman and pass/use the function directly.
//  example: dispatch(reducer, ...args) 
//  This file would still be needed because it holds the SINGLETON

// IDEA:
//  Trigger the re-render here, if all the high level elmeents take state, they can all get an update here.