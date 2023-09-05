import { render } from '../render.mjs';

/** 
 * Current game state.
 * @type {Object}
 */
export let currentState = {};
window.gameState = currentState;

/**
 * Super Simple "dispatch" function.
 * Runs the action function and triggers re-render. 
 * This is called by more specific dispatch methods.
 */
export async function dispatch(action) {
  // Mutates, smaller than immutable would be for JS13k
  await action(currentState);
  // Re-render the state!
  render(currentState);
}
