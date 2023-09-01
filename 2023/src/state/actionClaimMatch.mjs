import { canPayCost } from '../utils/canPayCost.mjs';

export async function actionClaimMatch(state, key) {
  const { card, player } = state;
  const match = card.matches[key];
  const canPay = canPayCost(match.dice, player.dice);

  console.log('match', canPay, match);

  return state;
}
