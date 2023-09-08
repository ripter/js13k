import { dispatch } from '../dispatch.mjs';

export async function dispatchChallenge(cardIdx) {
  await dispatch(async (state) => {
    const card = state.deck[cardIdx];
    // Open the challenge!
    state.challengeIdx = cardIdx;
  });
}