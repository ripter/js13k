// Handle Cardboard, Go, and Quest VR systems
export class Controller {
  constructor() {
    // Cardbard and VR without a controller use a camera cursor
    const elCamera = this.elCamera = document.querySelector('#camera');
    // Go & Quest controller
    const elLeftHand = this.elLeftHand = document.querySelector('#leftHand');

    // Default without a controller, switch when a controller connects
    elCamera.innerHTML = templateCardboard;
    window.addEventListener('gamepadconnected', () => {
      elCamera.innerHTML = '';
      elLeftHand.innerHTML = templateHand;
    });
  }
}

const templateCardboard = `
<a-entity
  cursor="fuse: true; fuseTimeout: 500"
  position="0 0 -1"
  geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
  material="color: black; shader: flat"
  >
</a-entity>`;

const templateHand = `
<a-entity
  laser-controls
  line="color: red; opacity: 0.75"
  >
</a-entity>`;
