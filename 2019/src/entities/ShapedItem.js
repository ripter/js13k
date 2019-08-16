import { updateElement } from '../utils/updateElement.js';


export class ShapedItem {
  constructor(position = {}, icon = 'HEART') {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.state = {
      // 'cursor-listener': {}, // required to get cursor events on the element
      selectable: {},
      orbit: {
        radius: THREE.Math.randInt(3, 6),
        startTheta: THREE.Math.randFloat(0, 2 * Math.PI),
        // direction * (360deg / largeNumber)
        deltaTheta: (THREE.Math.randInt(0, 1) === 0 ? 1 : -1) * ((2 * Math.PI) / Math.pow(10, THREE.Math.randFloat(3, 4))),
      },
      position: {
        x: position.x || 0,
        y: position.y || 0,
        z: position.z || 0,
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

  update(time, timeDelta) {
    const { position } = this.el.object3D;

    // Rotate the item
    // this.state.rotation.y = this.state.rotation.y + rotationSpeed * timeDelta;
    // this.el.object3D.rotation.y = this.el.object3D.rotation.y + (rotationSpeed * timeDelta);
    // updateElement(this.el, this.state);
  }
}
