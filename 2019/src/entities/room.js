import { updateElement } from '../utils/updateElement.js';

export class Room {
  constructor() {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    // Render/Update all the props.
    updateElement(this.el, propFloor);
    // Add it to the scene
    this.scene.appendChild(this.el);
  }

  update() {}
}

const propFloor = {
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
