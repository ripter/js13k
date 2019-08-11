import { updateElement } from '../utils/updateElement.js';
// Handle Cardboard, Go, and Quest VR systems
export class Controller {
  constructor() {
    // Cardbard and VR without a controller use a camera cursor
    const elCamera = this.elCamera = document.querySelector('#camera');
    // Go & Quest controller
    const elLeftHand = this.elLeftHand = document.querySelector('#leftHand');

    // Create a base entity to update.
    this.el = document.createElement('a-entity');

    // Default to Cardbard input
    elCamera.appendChild(this.el);
    updateElement(this.el, propsCardboard);

    // On controller, switch input
    window.addEventListener('gamepadconnected', () => {
      // Move the controller to the left hand
      elLeftHand.appendChild(this.el);
      // Clear all the old attributes.
      this.el.getAttributeNames().forEach((attrName) => {
        this.el.removeAttribute(attrName);
      });
      // Set the new attributes
      updateElement(this.el, propsLeftHand);
    });
  }
}

const propsCardboard = {
  cursor: {
    fuse: true,
    fuseTimeout: 500,
  },
  position: {
    x: 0,
    y: 0,
    z: -1,
  },
  geometry: {
    primitive: 'ring',
    radiusInner: 0.02,
    radiusOuter: 0.03,
  },
  material: {
    color: 'black',
    shader: 'flat',
  },
};

const propsLeftHand = {
  'laser-controls': 'laser-contorls',
  line: {
    color: 'red',
    opacity: 0.75,
  },
};
