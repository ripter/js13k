
export function actionCreateOpponents(state, numberToCreate) {
  const { player } = state;

  // Clone the player multiple times to generate the opponents
  const opponents = [];
  for (let i=0; i < numberToCreate; i++) {
    // Deep clone
    opponents.push(JSON.parse(JSON.stringify(player)));
  }
  
  return {
    ...state,
    opponents,
  };
}