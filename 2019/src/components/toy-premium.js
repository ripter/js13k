import { pathToShape } from '../utils/pathToShape.js';
import { PICKAX } from '../../media/v3/pickax/index.js';


AFRAME.registerComponent('toy-premium', {
  schema: {
    toy: {default: 'PICKAX'},
  },

  init() {
    const shape = PICKAX;

    const group = new THREE.Group();
    const parts = this.createParts(shape);
    parts.forEach(part => group.add(part));

    this.el.object3D.scale.set(0.01, 0.01, 0.001);
    this.el.object3D.add(group);
  },

  createParts(shape) {
    return (shape.parts
      .map(pathToShape)
      .map((geometry, index) => {
        const material = new THREE.MeshStandardMaterial({
          color: shape.colors[index],
        });
        return new THREE.Mesh(geometry, material);
      })
    );
  }

});
