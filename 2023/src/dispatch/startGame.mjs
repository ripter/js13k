import { dispatch } from '../dispatch.mjs';

export async function dispatchStartGame() {
  await dispatch(async (state) => {
    console.log('Start the game!')
  });
}