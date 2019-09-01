// import { updateElement } from '../utils/updateElement.js';

const HEIGHT = 0.25;
const WIDTH = 0.5;
const DEPTH = 0.5;

export class ToyBox {
  constructor(x=0, y=0, z=0, props = {}) {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.className = 'toybox';
    this.el.innerHTML = `
      <a-plane position="${x} ${y+HEIGHT/2} ${z+DEPTH/2}" rotation="0 0 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${x} ${y+HEIGHT/2} ${z-DEPTH/2}" rotation="0 0 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${x+WIDTH/2} ${y+HEIGHT/2} ${z}" rotation="0 90 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${x-WIDTH/2} ${y+HEIGHT/2} ${z}" rotation="0 90 0"   height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${x} ${y} ${z}" rotation="-90 0 0" height="${DEPTH}" width="${WIDTH}"></a-plane>
    `;
    //
    // this.props = {
    //   'cursor-listener': 'cursor-listener',
    //   position: {
    //     x: x || 0,
    //     y: y || 0,
    //     z: z || 0,
    //   },
    //   rotation: {
    //     x: x || 0,
    //     y: y || 0,
    //     z: z || 0,
    //   },
    //   geometry: {
    //     primitive: 'box',
    //     width: settings.width || 1,
    //     height: settings.height || 1,
    //     depth: settings.depth || 1,
    //   },
    //   material: {
    //     opacity: 1,
    //     shader: 'standard',
    //   },
    //   visible: true,
    // };
    //
    // updateElement(this.el, this.props);
    this.scene.appendChild(this.el);
  }

  //
  // Lifecycle
  //

  // update(time, timeDelta) {
    // const { rotation } = this.el.object3D;
    // rotation.set(rotation.x, rotation.y, THREE.Math.degToRad(rotation.y + 0.01 * timeDelta));
    // let { rotation } = this.props;
    // rotation.y = rotation.y + 0.01 * timeDelta;
    // this.rotation = rotation;
    // updateElement(this.el, this.props);
  // }

  //
  // API
  //

  reset(props) {

  }
}
