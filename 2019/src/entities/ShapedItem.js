import { updateElement } from '../utils/updateElement.js';

const Vec3 = {
  X: 0,
  Y: 1,
  Z: 2,
}

export class ShapedItem {
  constructor(position = {}, icon = 'HEART') {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.theta = THREE.Math.randFloat(0, 2 * Math.PI);
    // this.deltaTheta = 2 * Math.PI / 1000;
    this.deltaTheta = (2 * Math.PI) / Math.pow(10, THREE.Math.randInt(4, 4));
    // this.radius = Math.random() * 5 + 3;
    // this.thetaDegree = Math.random()*180;
    // this.height = Math.random() * 2 + 2;
    // this.rotationSpeed = THREE.Math.degToRad((Math.random()/25));

    this.state = {
      'cursor-listener': 'cursor-listener',
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

    // this.el.object3D.position.setFromCylindricalCoords(5, THREE.Math.degToRad(25), 10);
  }

  update(time, timeDelta) {
    const { position } = this.el.object3D;
    const { theta, deltaTheta } = this;

    this.theta += deltaTheta;
    // drift the item
    // position.setFromCylindricalCoords(radius, THREE.Math.degToRad(0.01 * timeDelta), height);
    // x = a + r * cos t
    // y = b + r * sin t
    // console.log(time, timeDelta);
    // const angle = THREE.Math.degToRad(360/100000) * time;
    const r = 5;
    const x = r * Math.cos(theta);
    const z = r * Math.sin(theta);
    position.set(x, position.y, z);

    // Rotate the item
    // this.state.rotation.y = this.state.rotation.y + rotationSpeed * timeDelta;
    // this.el.object3D.rotation.y = this.el.object3D.rotation.y + (rotationSpeed * timeDelta);
    // updateElement(this.el, this.state);
  }
}
