import { ACTION } from './actions.mjs';
import { actionLoadTribe } from './actionLoadTribe.mjs';

export async function stateReducer(state, action) {
  const { type, value, path } = action;
  switch(type) {
    case ACTION.LOAD_TRIBE:
      return actionLoadTribe(state, value);
    default:
      return state;
  }
}