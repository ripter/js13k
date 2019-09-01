import { uuid } from '../utils/uuid.js';

export class Toy {
  constructor(shape) {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.id = uuid();
    this.el.setAttribute('position', `0 ${THREE.Math.randInt(2, 4)} 0`);
    this.el.setAttribute('float-to', {speed: 0.05});
    this.el.setAttribute('toy', {key: shape});
    this.el.setAttribute('orbit', {
      radius: THREE.Math.randInt(3, 6),
      startTheta: THREE.Math.randFloat(0, 2 * Math.PI),
      deltaTheta: (THREE.Math.randInt(0, 1) === 0 ? 1 : -1) * ((2 * Math.PI) / Math.pow(10, THREE.Math.randFloat(3, 4))),
    });
    this.el.innerHTML = `<a-entity
      selectable
      geometry="primitive: extrudeShape; icon: ${shape}"
      material="opacity: 1; shader: standard"
      >
    </a-entity>`;

    this.scene.appendChild(this.el);
  }
}
