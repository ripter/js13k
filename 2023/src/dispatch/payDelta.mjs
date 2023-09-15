import { dispatch } from '../dispatch.mjs';


export async function dispatchPayDelta(who, deltaRating) {
  return await dispatch(async (state) => {
    state[who].red += deltaRating[0];
    state[who].green += deltaRating[1];
    state[who].blue += deltaRating[2];
  });
}