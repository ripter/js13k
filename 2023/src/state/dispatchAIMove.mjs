import { dispatch } from './dispatch.mjs';
import { actionAITakeTurn } from './actionAITakeTurn.mjs';


export async function dispatchAIMove() {
  await dispatch(async (state) => {
    await actionAITakeTurn(state);
  });
}
