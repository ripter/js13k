import { pathToShape } from '../utils/pathToShape.js';
import { PICKAX } from '../../media/v3/pickax/index.js';


AFRAME.registerComponent('toy-premium', {
  schema: {
    toy: {default: 'PICKAX'},
    // color: {default: '#FF851B'}
  },

  init() {
    const shape = PICKAX;

    const group = new THREE.Group();
    const parts = this.createParts(shape);
    parts.forEach(part => group.add(part));
    console.log('group', group);
    console.log('this', this);

    // this.el.setAttribute('scale', {x: 0.05, y: 0.05, z: 0.05});
    this.el.object3D.scale.set(0.01, 0.01, 0.01);
    this.el.object3D.add(group);
    // this.objec3D.app(group);
  },

  createParts(shape) {
    return (shape.parts
      .map(pathToShape)
      // .map(geo => {
      //   geo.scale(0.25, 0.25, 0.25);
      // })
      .map((geometry, index) => {
        console.log('color', shape.colors[index]);
        // geometry.scale(0.25, 0.25, 0.25);
        const material = new THREE.MeshToonMaterial({
          color: shape.colors[index],
        });
        return new THREE.Mesh(geometry, material);
      })
    );
  }

});
