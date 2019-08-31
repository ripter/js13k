import { updateElement } from '../utils/updateElement.js';

const propsLeftHand = {
  'laser-controls': { model: false },
  raycaster: {
    objects: '[selectable]',
  },
  line: {
    color: 'red',
    opacity: 0.75,
  },
};

// Handle Cardboard, Go, and Quest VR systems
export class Controller {
  constructor() {
    window.addEventListener('gamepadconnected', this);
  }

  handleEvent() {
    const elPlayer = document.querySelector('#player');
    const elHand = document.createElement('a-entity');
    // Set the new attributes
    updateElement(elHand, propsLeftHand);
    // Add the controller to the player
    elPlayer.appendChild(elHand);
    // stop listing for controllers
    window.removeEventListener('gamepadconnected', this);
  }
}
