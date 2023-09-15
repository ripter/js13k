import { dispatch } from '../dispatch.mjs';

export async function dispatchChallenge(cardIdx) {
  await dispatch(async (state) => {
    // Open the challenge!
    state.challengeIdx = cardIdx;
  });
}