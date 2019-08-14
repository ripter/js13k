import { updateElement } from '../utils/updateElement.js';

export class ShapedItem {
  constructor(x, y, z, icon = 'HEART') {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.state = {
      'cursor-listener': 'cursor-listener',
      position: {
        x: x || 0,
        y: y || 0,
        z: z || 0,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      geometry: {
        primitive: 'extrudeShape',
        icon,
      },
      material: {
        opacity: 1,
        shader: 'standard'
      },
      visible: true,
    };

    updateElement(this.el, this.state);
    this.scene.appendChild(this.el);
  }

  update() {}
}
