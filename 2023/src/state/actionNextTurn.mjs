
export async function actionNextTurn(state) {
  // Check if we've reached the end of the opponent's list.
  if (state.currentActorPath === 'player') {
    state.currentActorPath = 'opponents.0'; // Move to the first opponent.
  } else {
    const currentOpponentIndex = parseInt(state.currentActorPath.split('.')[1], 10);
    
    if (currentOpponentIndex < state.opponents.length - 1) {
      // If there are more opponents left.
      state.currentActorPath = `opponents.${currentOpponentIndex + 1}`;
    } else {
      // If we're back to the player.
      state.currentActorPath = 'player';
    }
  }

  return state;
}