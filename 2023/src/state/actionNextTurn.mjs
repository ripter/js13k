// import { actionAITakeTurn } from './actionAITakeTurn.mjs';


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

  /*
  // If it's an AI's turn.
  if (state.currentActorPath.includes('opponents')) {
    // AI decides its move.
    actionAITakeTurn(state);
    // Introduce a delay so the human player can see the move.
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay.
  }
  */

  // If it's the player's turn, we just return the updated state. The game will
  // naturally wait for the player's input as it's event-driven.
  return state;
}