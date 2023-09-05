import { actionNextTurn } from './actionNextTurn.mjs';
import { canPayCost } from '../utils/canPayCost.mjs';
import { get } from '../utils/get.mjs';

/**
 * Mutates state. 
 */
export async function actionClaimMatch(state, matchKey) {
  const { card, diceValues } = state;
  const matchOption = card.matches[matchKey];
  const actor = get(state, state.currentActorPath);

  // Bail if the actor can not afford the match.
  if (!canPayCost(matchOption.dice, actor.dice)) {
    return state;
  }

  // "Pay" for the match by removing the dice
  matchOption.dice.forEach(diceValue => {
    const index = actor.dice.indexOf(diceValue);
    if (index !== -1) {
      actor.dice.splice(index, 1);
    }
  });

  let rewardDescriptions = [];

  // Grant Rewards
  matchOption.rewards.forEach(award => {
    const { name } = award;
    const deltas = Array.isArray(award.delta) ? award.delta : [award.delta];
    const rewardValue = deltas[Math.floor(Math.random() * deltas.length)];
    actor[name] += rewardValue;

    rewardDescriptions.push(`${rewardValue} ${name}`);
  });

  // Convert reward descriptions to a string
  const rewardStr = rewardDescriptions.join(', ');

  // Update the matchOption as claimed
  matchOption.claimedBy = state.currentActorPath;

  state.gameLog.push({
    season: state.seasonCount,
    actorPath: state.currentActorPath,
    description: `${actor.name} spent ${matchOption.dice.map(d => diceValues[d]).join(', ')} resources to claim "${matchOption.description}" and received "${rewardStr}".`,
  });

  await actionNextTurn(state);
}

