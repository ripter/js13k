const ICONS = {
  HEART: [
    'moveTo',[0.528,0.097],
    'bezierCurveTo',[0.58,0.032,0.644,0,0.722,0],
    'bezierCurveTo',[0.798,0,0.864,0.032,0.919,0.097],
    'lineTo',[0.922,0.097],
    'bezierCurveTo',[0.974,0.161,1,0.236,1,0.322],
    'bezierCurveTo',[1,0.395,0.982,0.458,0.944,0.512],
    'lineTo',[0.919,0.547],
    'lineTo',[0.539,0.981],
    'lineTo',[0.5,1],
    'bezierCurveTo',[0.485,1,0.472,0.994,0.461,0.981],
    'lineTo',[0.081,0.547],
    'lineTo',[0.056,0.512],
    'bezierCurveTo',[0.019,0.458,0,0.395,0,0.322],
    'bezierCurveTo',[0,0.236,0.027,0.161,0.081,0.097],
    'bezierCurveTo',[0.136,0.032,0.202,0,0.278,0],
    'bezierCurveTo',[0.356,0,0.42,0.032,0.472,0.097],
    'lineTo',[0.5,0.134],
    'lineTo',[0.528,0.097],
  ],
  SMILE: [
    'moveTo',[20.35,19.7],
    'lineTo',[20.45,19.65],
    'bezierCurveTo',[19.183,20.883,17.683,21.5,15.95,21.5],
    'bezierCurveTo',[14.25,21.5,12.767,20.9,11.5,19.7],
    'lineTo',[11.4,19.6],
    'bezierCurveTo',[10.867,18.967,10.433,18.283,10.1,17.55],
    'bezierCurveTo',[9.933,17.15,9.95,16.767,10.15,16.4],
    'bezierCurveTo',[10.317,16.033,10.617,15.767,11.05,15.6],
    'lineTo',[12.25,15.65],
    'lineTo',[13.15,16.45],
    'lineTo',[13.85,17.6],
    'lineTo',[13.85,17.65],
    'bezierCurveTo',[14.45,18.217,15.15,18.5,15.95,18.5],
    'bezierCurveTo',[16.75,18.5,17.417,18.217,17.95,17.65],
    'lineTo',[18,17.6],
    'lineTo',[18.8,16.55],
    'bezierCurveTo',[18.9,16.15,19.167,15.85,19.6,15.65],
    'lineTo',[20.85,15.6],
    'bezierCurveTo',[21.25,15.7,21.567,15.95,21.8,16.35],
    'bezierCurveTo',[22,16.717,22.033,17.1,21.9,17.5],
    'bezierCurveTo',[21.567,18.3,21.05,19.033,20.35,19.7],
    'moveTo',[11,10.5],
    'bezierCurveTo',[11.567,10.5,12.033,10.7,12.4,11.1],
    'bezierCurveTo',[12.8,11.433,13,11.9,13,12.5],
    'bezierCurveTo',[13,13.1,12.8,13.6,12.4,14],
    'bezierCurveTo',[12.033,14.333,11.567,14.5,11,14.5],
    'bezierCurveTo',[10.367,14.5,9.883,14.333,9.55,14],
    'bezierCurveTo',[9.183,13.6,9,13.1,9,12.5],
    'bezierCurveTo',[9,11.9,9.183,11.433,9.55,11.1],
    'bezierCurveTo',[9.883,10.7,10.367,10.5,11,10.5],
    'moveTo',[21,10.5],
    'bezierCurveTo',[21.567,10.5,22.033,10.7,22.4,11.1],
    'bezierCurveTo',[22.8,11.433,23,11.9,23,12.5],
    'bezierCurveTo',[23,13.1,22.8,13.6,22.4,14],
    'bezierCurveTo',[22.033,14.333,21.567,14.5,21,14.5],
    'bezierCurveTo',[20.367,14.5,19.883,14.333,19.55,14],
    'bezierCurveTo',[19.183,13.6,19,13.1,19,12.5],
    'bezierCurveTo',[19,11.9,19.183,11.433,19.55,11.1],
    'bezierCurveTo',[19.883,10.7,20.367,10.5,21,10.5],
  ],
  CLOUD: [
    'moveTo',[10, 20],
    'lineTo',[35, 20],
    'bezierCurveTo',[40, 20, 40, 10, 35, 10],
    'bezierCurveTo',[35, 2, 22, 2, 21, 8],
    'bezierCurveTo',[21, 8, 15, 5, 12, 12],
    'bezierCurveTo',[12, 12, 5, 14,10, 20],
  ],
  LIGHTNING: [
    'moveTo',[240, 200],
    'lineTo',[290, 200],
    'lineTo',[270, 240],
    'lineTo',[310, 240],
    'lineTo',[230, 330],
    'lineTo',[250, 280],
    'lineTo',[200, 280],
  ],
}


AFRAME.registerGeometry('extrudeShape', {
  schema: {
    icon: {default: 'HEART'},
  },


  init(data) {
    const iconData = ICONS[data.icon];

    // Convert the array of commands into the shape.
    const shape = new THREE.Shape();
    // The data is an array of pairs, so process the pair together.
    for (let i=0; i < iconData.length; i += 2) {
      const method = iconData[i];
      const params = iconData[i+1];
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
