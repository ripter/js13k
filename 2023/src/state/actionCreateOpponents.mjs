
/**
 * Mutates state. 
 */
export async function actionCreateOpponents(state, numberToCreate) {
  const { player } = state;

  state.opponents = []; // Reset opponents before creating new ones

  for (let i = 0; i < numberToCreate; i++) {
    const actor = JSON.parse(JSON.stringify(player));
    actor.name = 'Opponent';
    state.opponents.push(actor);
  }
}