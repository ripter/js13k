import { ACTION } from './actions.mjs';
import { actionLoadTribe } from './actionLoadTribe.mjs';
import { actionClaimMatch } from './actionClaimMatch.mjs';

export async function stateReducer(state, action) {
  const { type, value } = action;
  switch(type) {
    case ACTION.LOAD_TRIBE:
      return actionLoadTribe(state, value);
    case ACTION.CLAIM_MATCH:
      return actionClaimMatch(state, value);
    default:
      return state;
  }
}