import { get } from '../utils/get.mjs';
import { rollDice } from '../utils/rollDice.mjs';
import { set } from '../utils/set.mjs';

/**
 * Rolls dice for the population and subtracts the cost.
 */
export function actionRollDice(state, path) {
  const actor = { ...get(state, path) };
  if (!actor) throw new Error(`Invalid path: ${path}`);

  const dicePaidFor = [];
  rollDice(actor.population, state.numberOfSidesOnDice).forEach(dice => {
    if (actor.food && actor.water) {
      actor.food--;
      actor.water--;
      dicePaidFor.push(dice);
    }
  });

  actor.dice = dicePaidFor.length ? dicePaidFor : [];
  return { ...state, ...set(state, path, actor) };
}
