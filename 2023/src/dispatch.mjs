import { render } from './render.mjs';

/** 
 * Current game state.
 * @type {Object}
 */
export let currentState = {};
window.gameState = currentState;

/**
 * Dispatch function for AsyncStateFlow
 * Updated to use a mutable state for JS13k
 */
export async function dispatch(action) {
  // mutations are smaller and faster! Great for JS13k
  await action(currentState);
  // Re-render the state!
  render(currentState);
}
