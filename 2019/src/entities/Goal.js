import { uuid } from '../utils/uuid.js';

export class Goal {
  constructor(props = {}) {
    this.sceneEl = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    const shapeUUID = uuid();
    this.el.setAttribute('position', {
      x: props.x,
      y: props.y,
      z: props.z,
    });
    this.el.innerHTML = `
      <a-entity
        id="${shapeUUID}"
        rotation="90 0 0"
        position="0 0 0"
        scale="0.25 0.25 0.25"
        geometry="primitive: extrudeShape; icon: ${props.icon}"
        material="color: #7FDBFF; transparent: true; opacity: 0.5;"
        key-needed="${props.icon}"
        lock-goal="key: ${props.icon}"
        selectable
        class="goal"
        ></a-entity>
    `;

    this.sceneEl.appendChild(this.el);
    this.elModel = this.el.querySelector(`#${shapeUUID}`);
  }

  // Expose a while entity's value
  get isUnlocked() {
    const data = this.elModel.getAttribute('lock-goal');
    return data.isUnlocked;
  }
}
