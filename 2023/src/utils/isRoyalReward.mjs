
export function isRoyalReward(rewards) {
  if (rewards.length !== 1) { return false; }
  return rewards[0].split(' ').length === 1;
}