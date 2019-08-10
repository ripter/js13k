// Handle Cardboard, Go, and Quest VR systems
export class Controller {
  constructor() {
    const elCamera = this.elCamera = document.querySelector('#camera');

    elCamera.innerHTML = templateCardboard;
    window.addEventListener('gamepadconnected', this);
  }

  handleEvent(event) {
    const { elCamera } = this;
    // Gamepad Connected
    console.log('Event', event.gamepad);
    // Switch to hand controls
    elCamera.innerHTML = templateHand;
  }

  tick() {
    // console.log('tick', arguments);
  }
}

const templateCardboard = `
<a-entity cursor="fuse: true; fuseTimeout: 500"
  position="0 0 -1"
  geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
  material="color: black; shader: flat">
</a-entity>`;

const templateHand = `<a-entity laser-controls line="color: red; opacity: 0.75"></a-entity>`;
