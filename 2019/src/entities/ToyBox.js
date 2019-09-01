import { getRandomShape } from '../utils/getRandomShape.js';
import { uuid } from '../utils/uuid.js';
const HEIGHT = 0.25;
const WIDTH = 0.5;
const DEPTH = 0.5;

export class ToyBox {
  constructor(x=0, y=0, z=0) {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.id = uuid();
    this.el.innerHTML = `
      <a-plane position="${x} ${y+HEIGHT/2} ${z+DEPTH/2}" rotation="0 0 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${x} ${y+HEIGHT/2} ${z-DEPTH/2}" rotation="0 0 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${x+WIDTH/2} ${y+HEIGHT/2} ${z}" rotation="0 90 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${x-WIDTH/2} ${y+HEIGHT/2} ${z}" rotation="0 90 0"   height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${x} ${y} ${z}" rotation="-90 0 0" height="${DEPTH}" width="${WIDTH}"></a-plane>
      <!-- Collision Box -->
      <a-entity selectable="type: Toybox" geometry="primitive: box; width: 1; height: 1; depth: 1" material="visible: false"></a-entity>
      <!-- Sign for the user -->
      <a-entity class="sign" position="-${WIDTH/3} 0 ${DEPTH/2}" scale="0.25 0.25 0.25"></a-entity>
    `;

    this.update({
      position: `${x} ${y} ${z}`,
      shape: getRandomShape(),
    });

    this.scene.appendChild(this.el);
  }

  update(newData) {
    const { position, shape } = newData;
    const elSign = this.el.querySelector('.sign');

    this.el.setAttribute('position', position);
    this.el.setAttribute('toybox', { key: shape });
    elSign.setAttribute('geometry', {
      primitive: 'extrudeShape',
      icon: shape,
    });
  }
}
