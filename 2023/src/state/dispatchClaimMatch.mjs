import { ACTION } from './actions.mjs';
import { dispatch } from './dispatch.mjs';

export async function dispatchClaimMatch(matchKey) {
  // call Dispatch to get the new State
  const state = await dispatch({
    type: ACTION.CLAIM_MATCH,
    value: matchKey,
  });
  console.log('new State', state);

  // Re-render elements with the new state.
  window.elmPanelPlayer.render(state);
  window.elmPanelCard.render(state);

  return state;
}