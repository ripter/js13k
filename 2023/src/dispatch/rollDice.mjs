import { dispatch } from '../dispatch.mjs';
import { roll2d6 } from '../utils/roll2d6.mjs';

/**
 * Roll the dice for the current challenge card!
 */
export async function dispatchRollDice(who, spend) {
  await dispatch(async (state) => {
    const card = state.deck[state.challengeIdx];
    const challenge = card.rating.reduce((acc, cardRating, idx) => {
      return acc + (cardRating - spend[idx]);
    }, 0);

    console.log('who', who, 'spend', spend, 'challenge', challenge);
    // Remove the spent resources from Who
    state[who].red -= spend[0];
    state[who].green -= spend[1];
    state[who].blue -= spend[2];

    // Roll 2d6, to match or beat challenge
    const rollResult = roll2d6();

    // Activate the Win or Lose modal.
    if (rollResult >= challenge) {
      // Give the rewards
      card.rewards.forEach(reward => {
        const split = reward.split(' ');
        if (split.length === 2) {
          state[who][split[1]] += parseInt(split[0], 10);
        } else {
          state[who].items.push(split[0]);
        }
      });
      //TODO: Replace the card in the pool.
      window.elmChallengeModal.showWin(rollResult);
    } else {
      window.elmChallengeModal.showLose(rollResult);
    }
  });
}