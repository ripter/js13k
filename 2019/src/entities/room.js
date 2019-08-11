import { updateElement } from '../utils/updateElement.js';

export class Room {
  constructor() {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.props = {
      geometry: {
        primitive: 'plane',
        width: 10,
        height: 10,
      },
      rotation: {
        x: -90,
        y: 0,
        z: 0,
      }
    };
    // Render/Update all the props.
    updateElement(this.el, this.props);
    // Add it to the scene
    this.scene.appendChild(this.el);
  }

  update() {}
}
