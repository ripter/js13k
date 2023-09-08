import { dispatch } from '../dispatch.mjs';

/**
 * Attention/Demo Mode.
 * This is the pre-game mode, shown before the user starts the game.
 */
export async function dispatchShowRules() {
  await dispatch(async (state) => {
    state.activeDialogIdx = 1;
  });
}