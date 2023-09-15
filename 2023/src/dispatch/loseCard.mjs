import { dispatch } from '../dispatch.mjs';
import { dispatchPayDelta } from './payDelta.mjs';

/**
 * Attention/Demo Mode.
 * This is the pre-game mode, shown before the user starts the game.
 */
export async function dispatchLoseCard(deltaRating) {
  return await dispatch(async (state) => {
    await dispatchPayDelta('player', deltaRating);
  });
}