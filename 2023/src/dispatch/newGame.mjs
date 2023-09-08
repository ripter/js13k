import { dispatch } from '../dispatch.mjs';
import { INITAL_STATE } from '../initalState.mjs';

export async function dispatchNewGame() {
  await dispatch(async (state) => {
    // Mutate! Reset the state.
    Object.assign(state, INITAL_STATE);
  });
}