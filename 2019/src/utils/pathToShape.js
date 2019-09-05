
// converts path commands into a THREE.Shape()
export function pathToShape(commands, extrudeSettings = {depth: 0.15, bevelEnabled: false}) {
  const shape = new THREE.Shape();
  // The data is an array of pairs, so process the pair together.
  for (let i=0; i < commands.length; i += 2) {
    const method = commands[i];
    const params = commands[i+1];
    shape[method].apply(shape, params);
  }
  return new THREE.ExtrudeGeometry( shape, extrudeSettings );
}
