import { canPayCost } from '../utils/canPayCost.mjs';
import { get } from '../utils/get.mjs';
import { actionNextTurn } from './actionNextTurn.mjs';

export async function actionClaimMatch(state, matchKey) {
  const card = state.card;
  const matchOption = card.matches[matchKey];
  const actor = get(state, state.currentActorPath);

  // TODO: bail if it can not be claimed anymore.
  // Check if the actor can afford the match
  if (!canPayCost(matchOption.dice, actor.dice)) {
    return state; // Return the unmodified state if they can't afford
  }

  // "Pay" for the match by removing the dice
  matchOption.dice.forEach(diceValue => {
    const index = actor.dice.indexOf(diceValue);
    if (index !== -1) {
      actor.dice.splice(index, 1);
    }
  });

  // Grant Rewards
  matchOption.rewards.forEach(award => {
    const { name } = award;
    const deltas = Array.isArray(award.delta) ? award.delta : [award.delta];
    actor[name] += deltas[Math.floor(Math.random() * deltas.length)];
  });

  // Update the matchOption as claimed
  matchOption.claimedBy = state.currentActorPath;

  state.gameLog.push({
    season: state.season,
    actorPath: state.currentActorPath,
    description: `${matchOption.description}`,
  });

  await actionNextTurn(state);

  return state;
}
