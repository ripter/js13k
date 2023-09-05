import { actionLoadTribe } from './actionLoadTribe.mjs';
import { dispatch } from './dispatch.mjs';

/**
 * Loads the Tribe from from URL.
 * This is the Start of a new Game. 
 */
export async function dispatchLoadTribe(tribeURL) {
  await dispatch(async (state) => {
    await actionLoadTribe(state, tribeURL);
  });
}