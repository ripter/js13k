import { Toy } from '../entities/Toy.js';
import { ToyBox } from '../entities/ToyBox.js';
import { getRandomShape } from '../utils/getRandomShape.js';

const TOTAL_TOYBOXES = 3;
const TOYS_PER_BOX = 5;
// const TOTAL_TOYS = TOTAL_TOYBOXES * TOYS_PER_BOX;

// Creates a new game state
export function newState() {
  const state = {
    toyboxes: [],
    toys: [],
    selectedToy: null,
    selectedToybox: null,
  };

  // Create a random shape for each toybox
  const availableShapes = [];
  for (let i=0; i < TOTAL_TOYBOXES; i++) {
    let randomShape = getRandomShape();
    while (availableShapes.includes(randomShape)) {
      randomShape = getRandomShape();
    }
    availableShapes.push(randomShape);
  }

  // Create enough toys to fill each box
  state.toys = availableShapes.reduce((acc, shape) => {
    const toys = (new Array(TOYS_PER_BOX)).fill().map(() => new Toy(shape));
    return acc.concat(toys);
  }, []);

  // Put the toyboxes into position
  //TODO: auto place in a semi-circle around the player
  ['-1.5 0.1 -1', '0 0.1 -1', '1.5 0.1 -1'].forEach((position, index) => {
    state.toyboxes[index] = new ToyBox({
      shape: availableShapes[index],
      totalToys: TOYS_PER_BOX,
      position,
    });
  });

  return state;
}
