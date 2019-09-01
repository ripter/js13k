
// Modifies state.
// Resets for a new game.
export function resetGameState(state) {
  const { toyboxes } = state;

  ['-2 0.1 -2', '0 0.1 -2', '2 0.1 -2'].forEach((position, index) => {
    toyboxes[index].el.setAttribute('position', position);
  });
}

function resetToybox(toybox) {
}
