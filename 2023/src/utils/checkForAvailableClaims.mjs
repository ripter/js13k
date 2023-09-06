
export function checkForAvailableClaims(state) {
  const { card, diceValues } = state;

  // Check the player first
  if (canActorClaimAnyMatch(state.player, card.matches)) {
    return true;
  }

  // Check each opponent
  for (const opponent of state.opponents) {
    if (canActorClaimAnyMatch(opponent, card.matches)) {
      return true;
    }
  }

  return false;
}
