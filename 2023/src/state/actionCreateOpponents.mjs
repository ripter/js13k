
export function actionCreateOpponents(state, numberToCreate) {
  const { player } = state;

  // Clone the player multiple times to generate the opponents
  const opponents = [];
  for (let i=0; i < numberToCreate; i++) {
    // Deep clone
    const actor = JSON.parse(JSON.stringify(player));
    actor.name = 'Opponent'
    opponents.push(actor);

  }
  
  return {
    ...state,
    opponents,
  };
}