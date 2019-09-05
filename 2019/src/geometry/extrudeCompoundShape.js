import { PICKAX } from '../../media/v3/pickax/index.js';
console.log('PICKAX', PICKAX);

//extrudeCompoundShape.js
//
AFRAME.registerGeometry('extrudeCompoundShape', {
  schema: {
    shape: {default: 'PICKAX'},
    // extrudeDepth: {default: 1},
  },


  init(data) {
    const shape = PICKAX;
    const compoundGeometry = new THREE.Geometry();

    // create and process each shape into a colored mesh
    const meshList = shape.parts.map(this.createShapeGeometry).map((geo, index) => {
      console.log('color', shape.colors[index]);
      const mat = new THREE.MeshToonMaterial({
        color: shape.colors[index],
      });
      return new THREE.Mesh(geo, mat);
    });

    console.log('meshList', meshList);
    // merge all the meshes together
    meshList.forEach((mesh, index) => {
      mesh.updateMatrix();
      compoundGeometry.merge(mesh.geometry, mesh.matrix, index);
    });

    compoundGeometry.scale(0.25, 0.25, 0.25);

    compoundGeometry.computeBoundingBox();
    compoundGeometry.mergeVertices();
    compoundGeometry.computeFaceNormals();
    compoundGeometry.computeVertexNormals();
    window.geoTest = compoundGeometry;
    this.geometry = compoundGeometry;
  },

  createShapeGeometry(commands) {
    const shape = new THREE.Shape();
    // The data is an array of pairs, so process the pair together.
    for (let i=0; i < commands.length; i += 2) {
      const method = commands[i];
      const params = commands[i+1];
      shape[method].apply(shape, params);
    }

    const extrudeSettings = {
      depth: 1,
      bevelEnabled: false,
    };
    return new THREE.ExtrudeGeometry( shape, extrudeSettings );
  }
});
