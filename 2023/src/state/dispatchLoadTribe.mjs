import { ACTION } from './actions.mjs';
import { dispatch } from './dispatch.mjs';

export async function dispatchLoadTribe(tribeURL) {
  // call Dispatch to get the new State
  const state = await dispatch({
    type: ACTION.LOAD_TRIBE,
    value: tribeURL,
  });

  // Re-render elements with the new state.
  window.elmPanelPlayer.render(state);
  window.elmPanelCard.render(state);
  window.elmScenarioPicker.style.display = 'none';
}