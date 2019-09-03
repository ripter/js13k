const HEIGHT = 0.25;
const WIDTH = 0.5;
const DEPTH = 0.5;

export class ToyBox {
  constructor(props) {
    const { position, shape, totalToys } = props;
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.setAttribute('position', position);
    this.el.setAttribute('toybox', {
      key: shape,
      totalToys,
    });
    this.el.innerHTML = `
      <a-plane position="0 ${HEIGHT/2} ${DEPTH/2}" rotation="0 0 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="0 ${HEIGHT/2} ${-DEPTH/2}" rotation="0 0 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${WIDTH/2} ${HEIGHT/2} 0" rotation="0 90 0" height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="${-WIDTH/2} ${HEIGHT/2} 0" rotation="0 90 0"   height="${HEIGHT}" width="${WIDTH}" material="side: double"></a-plane>
      <a-plane position="0 0 0" rotation="-90 0 0" height="${DEPTH}" width="${WIDTH}"></a-plane>
      <a-entity selectable="type: Toybox" geometry="primitive: box; width: 1; height: 1; depth: 1" material="visible: false"></a-entity>
      <a-entity position="-${WIDTH/3} 0 ${DEPTH/2}" scale="0.25 0.25 0.25" geometry="primitive: extrudeShape; icon: ${shape}"></a-entity>
    `;

    this.scene.appendChild(this.el);
  }
}
