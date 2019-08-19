
export class Goal {
  constructor(props = {}) {
    this.sceneEl = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.setAttribute('position', {
      x: props.x,
      y: props.y,
      z: props.z,
    });
    this.el.innerHTML = `
      <a-entity
        rotation="90 0 0"
        position="0 1 0"
        scale="0.25 0.25 0.25"
        geometry="primitive: extrudeShape; icon: ${props.icon}"
        material="color: #7FDBFF; transparent: true; opacity: 0.5;"
        selectable
        class="goal"
        ></a-entity>
    `;

    this.sceneEl.appendChild(this.el);
  }
}
