export class Timer {
  constructor(props = {}) {
    this.sceneEl = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.id='timer';
    this.el.setAttribute('position', {
      x: props.x || 0,
      y: props.y || 0,
      z: props.z || 0,
    });
    this.el.innerHTML = `
      <a-entity
        rotation="0 -60 180"
        >
        <a-entity
          class="timer-display"
          position="0.1 -0.43 0.25"
          rotation="45 -90 180"
          text="value: 12:34; color: #000; align: center; width: 4;"></a-entity>
        <a-entity
          scale="0.5 0.5 0.5"
          geometry="primitive: extrudeShape; icon: TIMER; extrudeDepth: 1;"
          material="color: #AAAAAA;"
          ></a-entity>
      </a-entity>
    `;

    this.sceneEl.appendChild(this.el);
  }
}
