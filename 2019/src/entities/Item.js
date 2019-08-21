import { updateElement } from '../utils/updateElement.js';
import { uuid } from '../utils/uuid.js';


export class Item {
  constructor(props = {}) {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.id = uuid(),
    this.el.classList.add('item');
    this.state = {
      class: props.shape,
      selectable: {},
      'float-to': {
        active: false,
        speed: 0.05,
      },
      'lock-key': {
        key: props.shape,
      },
      orbit: {
        radius: THREE.Math.randInt(3, 6),
        startTheta: THREE.Math.randFloat(0, 2 * Math.PI),
        // direction * (360deg / largeNumber)
        deltaTheta: (THREE.Math.randInt(0, 1) === 0 ? 1 : -1) * ((2 * Math.PI) / Math.pow(10, THREE.Math.randFloat(3, 4))),
      },
      position: {
        x: props.x || 0,
        y: props.y || 0,
        z: props.z || 0,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      geometry: {
        primitive: 'extrudeShape',
        icon: props.shape,
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
}
