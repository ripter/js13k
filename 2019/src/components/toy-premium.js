import { pathToShape } from '../utils/pathToShape.js';
import { SHAPES_PREMIUM } from '../consts/shapes-premium.js';


AFRAME.registerComponent('toy-premium', {
  schema: {
    toy: {default: 'PICKAX'},
  },

  init() {
    const shape = SHAPES_PREMIUM[this.data.toy];

    // Create a group of meshes
    const group = new THREE.Group();
    const parts = this.createParts(shape);
    parts.forEach(part => group.add(part));

    // Scale and add the group
    this.el.object3D.scale.set(0.01, 0.01, 0.001);
    this.el.object3D.add(group);
  },

  // Turns a shape commands into a Mesh
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
  },

});
