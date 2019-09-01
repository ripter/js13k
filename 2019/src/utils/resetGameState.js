import { Toy } from '../entities/Toy.js';
import { ToyBox } from '../entities/ToyBox.js';
import { getRandomShape } from '../utils/getRandomShape.js';

// Modifies state.
// Resets for a new game.
export function resetGameState(state) {
  const { toyboxes, toys } = state;

  // Create a random shape for each toybox
  const availableShapes = toyboxes.map(() => getRandomShape());

  // Put the toyboxes into position
  //TODO: this is the wrong place for this code. The toyboxes do not move between games.
  ['-2 0.1 -1', '0 0.1 -1', '2 0.1 -1'].forEach((position, index) => {
    toyboxes[index] = new ToyBox({
      shape: availableShapes[index],
      position,
    });
  });

  // Fill with new Toys
  state.toys = toys.map((toy) => {
    if (toy) { toy.el.remove(); }
    return new Toy(getRandomShape(availableShapes));
  });
}
