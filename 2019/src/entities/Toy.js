import { uuid } from '../utils/uuid.js';
import { getRandomShape } from '../utils/getRandomShape.js';


export class Toy {
  constructor() {
    const shape = getRandomShape();
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');


    this.el.id = uuid();
    this.el.classList.add('item');

    this.el.innerHTML = `<a-entity
      selectable
      float-to="active: false; speed: 0.05"
      lock-key="key: ${shape}"
      geometry="primitive: extrudeShape; icon: ${shape}"
      material="opacity: 1; shader: standard"
      position="0 ${THREE.Math.randInt(2, 4)} 0"
      orbit="
        radius: ${THREE.Math.randInt(3, 6)};
        startTheta: ${THREE.Math.randFloat(0, 2 * Math.PI)};
        deltaTheta: ${(THREE.Math.randInt(0, 1) === 0 ? 1 : -1) * ((2 * Math.PI) / Math.pow(10, THREE.Math.randFloat(3, 4)))}"
      >
    </a-entity>
    `;

    this.scene.appendChild(this.el);
  }
}
