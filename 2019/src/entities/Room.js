export class Room {
  constructor(props = {}) {
    this.sceneEl = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.id = 'ROOM';
    this.el.setAttribute('position', {
      x: props.x || 0,
      y: props.y || 0,
      z: props.z || 0,
    });

    this.el.innerHTML = `
      <a-entity class="timer-display" text="value: 00:00"></a-entity>
      <a-entity
        rotation="0 90 0"
        scale="0.5 0.5 0.5"
        position="0 0 0"
        geometry="primitive: extrudeShape; icon: TIMER; extrudeDepth: 1;"
        material="color: #AAAAAA;"
        ></a-entity>
      <a-plane
        class="FLOOR"
        color="#3D9970"
        position="0 0 0"
        height="100"
        width="100"
        rotation="-90 0 0"
        ></a-plane>
    `;

    this.sceneEl.appendChild(this.el);
  }
}
