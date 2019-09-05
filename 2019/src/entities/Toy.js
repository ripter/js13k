import { SHAPES } from '../consts/shapes.js';

export class Toy {
  constructor(shape) {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.setAttribute('position', `0 ${THREE.Math.randInt(2, 4)} 0`);
    this.el.setAttribute('rotation', '0 0 0');
    this.el.setAttribute('float-to', {speed: 0.05});
    this.el.setAttribute('toy', {key: shape});
    this.el.setAttribute('selectable', {});
    this.el.setAttribute('orbit', {
      radius: THREE.Math.randInt(3, 6),
      startTheta: THREE.Math.randFloat(0, 2 * Math.PI),
      deltaTheta: (THREE.Math.randInt(0, 1) === 0 ? 1 : -1) * ((2 * Math.PI) / Math.pow(10, THREE.Math.randFloat(2.6, 3.5))),
    });
    this.el.innerHTML = this.getModelHTML(shape);

    this.scene.appendChild(this.el);
  }

  getModelHTML(shape) {
    // Paying users get premium toys, just like in real life.
    if(false){//document.monetization && document.monetization.state === 'started') {
      return `<a-entity
        toy-premium="toy: ${shape};"></a-entity>
      `;
    }
    else {
      const color = SHAPES[shape].color;
      return `<a-entity
        geometry="primitive: extrudeShape; icon: ${shape}"
        material="opacity: 1; shader: flat; color: ${color}"
        >
      </a-entity>`
    }
  }
}
