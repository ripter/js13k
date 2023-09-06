import { canPayCost } from './canPayCost.mjs';

export function canActorClaimAnyMatch(actor, matches) {
  return matches.some(match => 
    !match.claimedBy && canPayCost(match.dice, actor.dice)
  );
}
