import { dispatch } from '../dispatch.mjs';

/**
 * Attention/Demo Mode.
 * This is the pre-game mode, shown before the user starts the game.
 */
export async function dispatchAttentionMode() {
  await dispatch(async (state) => {
    console.log('Dispatch called', state);
  });
}