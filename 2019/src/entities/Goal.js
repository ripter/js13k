
export class Goal {
  constructor(props = {}) {
    this.sceneEl = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.innerHTML = `
      <a-entity geometry="primitive: extrudeShape; icon: ${props.icon}"></a-entity>
    `;

    this.sceneEl.appendChild(this.el);
  }
}
