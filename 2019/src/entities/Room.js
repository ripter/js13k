export class Room {
  constructor(props = {}) {
    this.sceneEl = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.setAttribute('position', {
      x: props.x || 0,
      y: props.y || 0,
      z: props.z || 0,
    });

    this.el.innerHTML = `
      <a-entity
        rotation="0 90 0"
        scale="0.5 0.5 0.5"
        position="0 1.5 0"
        geometry="primitive: extrudeShape; icon: TIMER; extrudeDepth: 1;"
        material="color: #AAAAAA;"
        ></a-entity>
    `;

    this.sceneEl.appendChild(this.el);
  }
}
