import { actionClaimMatch } from './actionClaimMatch.mjs';
import { ACTION } from './actions.mjs';
import { dispatch } from './dispatch.mjs';

export async function dispatchClaimMatch(matchKey) {
  await dispatch(async (state) => {
    await actionClaimMatch(state, matchKey)
  });
}