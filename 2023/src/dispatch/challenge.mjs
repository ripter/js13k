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
      challengeRating,
      armory,
    );

    // Open the challenge!
    // state.challengeIdx = cardIdx;
    // Post Jam, I have time to think about how to update these instead of jamming everyhing into render.
    // In a future update, move this out of render and into a dispatch function. (maybe...)
    // window.elmChallengeModal.state = {
    //   card: state.deck[state.challengeIdx],
    //   player: state.player,
    // }
  });
}