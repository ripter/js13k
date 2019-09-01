
// Modifies state.
// Resets for a new game.
export function resetGameState(state) {
  const { toyboxes } = state;

  // Put the toyboxes into position
  //TODO: this is the wrong place for this code. The toyboxes do not move between games.
  ['-2 0.1 -2', '0 0.1 -2', '2 0.1 -2'].forEach((position, index) => {
    toyboxes[index].el.setAttribute('position', position);
  });

  
}
