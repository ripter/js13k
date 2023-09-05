import { get } from '../utils/get.mjs';
import { rollDice } from '../utils/rollDice.mjs';

/**
 * Rolls dice for the population and subtracts the cost.
 */
export function actionRollDice(state, path) {
  const actor = get(state, path);
  if (!actor) throw new Error(`Invalid path: ${path}`);

  actor.dice = [];  // Reset dice before rolling

  rollDice(actor.population, state.numberOfSidesOnDice).forEach(dice => {
    if (actor.food && actor.water) {
      actor.food--;
      actor.water--;
      actor.dice.push(dice);
    }
  });
}
