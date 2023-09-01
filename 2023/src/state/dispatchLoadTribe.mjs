import { ACTION } from './actions.mjs';
import { CLASS_ACTIVE } from '../cssClasses.mjs';
import { dispatch } from './dispatch.mjs';

export async function dispatchLoadTribe(tribeURL) {
  // call Dispatch to get the updated State
  const state = await dispatch({
    type: ACTION.LOAD_TRIBE,
    value: tribeURL,
  });
  console.log('State Updated!', state);

  // Update the custom elements
  window.elmScenarioPicker.classList.remove(CLASS_ACTIVE);
  window.elmScenarioCard.classList.add(CLASS_ACTIVE);
}