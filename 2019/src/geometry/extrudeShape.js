import { SHAPES } from '../shapes.js';

AFRAME.registerGeometry('extrudeShape', {
  schema: {
    icon: {default: 'HEART'},
  },


  init(data) {
    const shapeCommands = SHAPES[data.icon];

    // Convert the array of commands into the shape.
    const shape = new THREE.Shape();
    // The data is an array of pairs, so process the pair together.
    for (let i=0; i < shapeCommands.length; i += 2) {
      const method = shapeCommands[i];
      const params = shapeCommands[i+1];
      shape[method].apply(shape, params);
    }


    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    // Icons import upside down, so flip it the right way.
    geometry.rotateX(3.14159);

    // update with the new shape.
    // geometry.computeBoundingBox();
    // geometry.mergeVertices();
    // geometry.computeFaceNormals();
    // geometry.computeVertexNormals();
    this.geometry = geometry;
  },
});
