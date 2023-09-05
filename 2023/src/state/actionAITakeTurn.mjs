import { actionClaimMatch } from './actionClaimMatch.mjs';
import { actionNextTurn } from './actionNextTurn.mjs';
import { canPayCost } from '../utils/canPayCost.mjs';
import { get } from '../utils/get.mjs';

export async function actionAITakeTurn(state) {
  const actor = get(state, state.currentActorPath);
  // Filter the matches the AI can afford
  const affordableMatches = state.card.matches.filter(match =>
    match.claimedBy === false &&  canPayCost(match.dice, actor.dice)
  );

  // If there are no matches the AI can afford, just go to the next turn
  if (!affordableMatches.length) {
    return await actionNextTurn(state);
  }

  // Choose a random match from the affordable ones
  const chosenMatch = affordableMatches[Math.floor(Math.random() * affordableMatches.length)];
  await actionClaimMatch(state, chosenMatch.key);
  return await actionNextTurn(state);
}