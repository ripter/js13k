import { updateElement } from '../utils/updateElement.js';


//TODO: Make sure the default model isn't loaded, its from a CDN server and not allowed.
const propsHand = {
  'laser-controls': { model: false },
  raycaster: {
    objects: '[selectable]',
  },
  line: {
    color: 'red',
    opacity: 0.75,
  },
  // rotation: {x: 0, y: 0, z: 25 },
};

// Handle Cardboard, Go, and Quest VR systems
export class Controller {
  constructor() {
    // Go & Quest controller
    this.elHand = this.elHand = document.querySelector('#hand');
    // Create a base entity to update.
    this.el = document.createElement('a-entity');
    // Put the entity in the right hand.
    this.elHand.appendChild(this.el);
    // wait for the controller to connect.
    window.addEventListener('gamepadconnected', this);
  }

  handleEvent(event) {
    // Set the new attributes
    updateElement(this.el, propsHand);
    // remove the position because it'll be the same as the IRL controller.
    this.elHand.removeAttribute('position');
    // remove the event listener
    window.removeEventListener('gamepadconnected', this);
  }
}
