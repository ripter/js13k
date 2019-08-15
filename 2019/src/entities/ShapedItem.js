import { updateElement } from '../utils/updateElement.js';

export class ShapedItem {
  constructor(icon = 'HEART') {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.radius = Math.random() * 5 + 3;
    this.thetaDegree = Math.random()*180;
    this.height = Math.random() * 2 + 2;
    this.rotationSpeed = THREE.Math.degToRad((Math.random()/25));

    this.state = {
      'cursor-listener': 'cursor-listener',
      position: {
        x: 0,
        y: 0,
        z: 0,
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
    const { radius, height, rotationSpeed, thetaDegree } = this;

    // drift the item
    position.setFromCylindricalCoords(radius, THREE.Math.degToRad(0.1 * timeDelta), height);

    // Rotate the item
    // this.state.rotation.y = this.state.rotation.y + rotationSpeed * timeDelta;
    this.el.object3D.rotation.y = this.el.object3D.rotation.y + (rotationSpeed * timeDelta);
    // updateElement(this.el, this.state);
  }
}
