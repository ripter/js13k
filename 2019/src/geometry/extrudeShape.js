import { SHAPES } from '../shapes.js';

AFRAME.registerGeometry('extrudeShape', {
  schema: {
    icon: {default: 'HEART'},
    extrudeDepth: {default: 0.15},
  },


  init(data) {
    const shapeCommands = SHAPES[data.icon];
    //TODO: this guard can be removed in the prod version.
    if (!shapeCommands) { throw new Error(`Unknown icon "${data.icon}". Did you mean "${data.icon.toUpperCase()}"?`); }

    // Convert the array of commands into the shape.
    const shape = new THREE.Shape();
    // The data is an array of pairs, so process the pair together.
    for (let i=0; i < shapeCommands.length; i += 2) {
      const method = shapeCommands[i];
      const params = shapeCommands[i+1];
      shape[method].apply(shape, params);
    }


    const extrudeSettings = {
      depth: data.extrudeDepth,
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
