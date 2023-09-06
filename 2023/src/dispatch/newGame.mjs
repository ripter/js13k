import { dispatch } from '../dispatch.mjs';

export async function dispatchNewGame() {
  await dispatch(async (state) => {
    console.log('Dispatch called', state);
  });
}