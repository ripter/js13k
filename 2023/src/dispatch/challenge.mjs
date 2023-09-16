import { dispatch } from '../dispatch.mjs';

export async function dispatchChallenge(cardIdx) {
  await dispatch(async (state) => {
    const card = state.deck[cardIdx];
    const challengeRating = card.rating;
    const armory = [state.player.red, state.player.green, state.player.blue];

    // Save the current card index for future actions.
    state.challengeIdx = cardIdx;

    // Open the Challenge Modal with the selected card.    
    window.elmChallengeModal.showCard(
      card.name,
      challengeRating,
      armory,
      card.rewards,
    );
  });
}