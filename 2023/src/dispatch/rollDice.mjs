import { dispatch } from '../dispatch.mjs';
import { roll2d6 } from '../utils/roll2d6.mjs';

/**
 * Roll the dice for the current challenge card!
 */
export async function dispatchRollDice(who, challenge, spend) {
  await dispatch(async (state) => {
    console.log('who', who, 'challenge', challenge, 'state', state);
    // Remove the spent resources from Who
    state[who].red -= spend[0];
    state[who].green -= spend[1];
    state[who].blue -= spend[2];

    // Roll 2d6, to match or beat challenge
    state.rollResult = roll2d6();

    // Activate the Win or Lose modal.
    if (state.rollResult >= challenge) {
      state.activeDialogIdx = 2;
    } else {
      state.activeDialogIdx = 3;
    }
  });
}