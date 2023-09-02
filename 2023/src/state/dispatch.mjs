import { stateReducer } from './stateReducer.mjs';
import { render } from '../render.mjs';

/** 
 * Current game state.
 * @type {Object}
 */
export let currentState = {};
window.gameState = currentState;

/**
 * Dispatches an action to update the game state and subsequently re-renders the UI.
 * 
 * This function handles two types of actions:
 * 1. If the action is a function, it directly mutates the `currentState`.
 * 2. If the action is an object, it uses the `stateReducer` to derive the next state.
 * 
 * @function
 * @async
 * @param {Function|Object} action - The action to be dispatched. Can be either a direct mutative function or an action object for the state reducer.
 * @global
 */
export async function dispatch(action) {
  if (typeof action === 'function') {
    // Mutates, smaller than immutable would be for JS13k
    await action(currentState);
  } else {
    // Run the State Reducer
    const nextState = await stateReducer(currentState, action);
    // if the reference didn't change, then do nothing.
    if (nextState === currentState) { return currentState; }
    // Save the new reference.
    currentState = nextState;
    window.gameState = currentState;
  }

  render(currentState);
}
