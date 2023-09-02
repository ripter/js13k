import { actionLoadTribe } from './actionLoadTribe.mjs';
import { ACTION } from './actions.mjs';
import { dispatch } from './dispatch.mjs';

export async function dispatchLoadTribe(tribeURL) {
  // call Dispatch to get the new State
  const state = await dispatch({
    type: ACTION.LOAD_TRIBE,
    value: tribeURL,
  });

  // await dispatch(async (state) => {
  //   await actionLoadTribe(state, tribeURL);
  // });

  // Re-render elements with the new state.
  window.elmScenarioPicker.style.display = 'none';
}