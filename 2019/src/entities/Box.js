import { updateElement } from '../utils/updateElement.js';

export class Box {
  constructor(x, y, z, settings = {}) {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.props = {
      'cursor-listener': 'cursor-listener',
      position: {
        x: x || 0,
        y: y || 0,
        z: z || 0,
      },
      rotation: {
        x: x || 0,
        y: y || 0,
        z: z || 0,
      },
      geometry: {
        primitive: 'box',
        width: settings.width || 1,
        height: settings.height || 1,
        depth: settings.depth || 1,
      },
      material: {
        opacity: 1,
        shader: 'standard'
      },
      visible: true,
    }

    updateElement(this.el, this.props);
    this.el.className = 'box';
    this.scene.appendChild(this.el);
  }

  update(time, timeDelta) {
    const { rotation } = this.el.object3D;
    rotation.set(rotation.x, rotation.y, THREE.Math.degToRad(rotation.y + 0.01 * timeDelta))
    // let { rotation } = this.props;
    // rotation.y = rotation.y + 0.01 * timeDelta;
    // this.rotation = rotation;
    // updateElement(this.el, this.props);
  }
}
