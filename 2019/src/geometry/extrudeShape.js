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
  CLOUD: [
    'moveTo',[2.5, 5],
    'lineTo',[8.75, 5],
    'bezierCurveTo',[10, 5, 10, 2.5, 8.75, 2.5],
    'bezierCurveTo',[8.75, 0.5, 5.5, 0.5, 5.25, 2],
    'bezierCurveTo',[5.25, 2, 3.75, 1.25, 3, 3],
    'bezierCurveTo',[3, 3, 1.25, 3.5, 2.5, 5],
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
  SAD: [
    'moveTo',[2,0],
    'bezierCurveTo',[2.567,0,3.033,0.2,3.4,0.6],
    'bezierCurveTo',[3.8,0.933,4,1.4,4,2],
    'bezierCurveTo',[4,2.6,3.8,3.1,3.4,3.5],
    'bezierCurveTo',[3.033,3.833,2.567,4,2,4],
    'bezierCurveTo',[1.367,4,0.883,3.833,0.55,3.5],
    'bezierCurveTo',[0.183,3.1,0,2.6,0,2],
    'bezierCurveTo',[0,1.4,0.183,0.933,0.55,0.6],
    'bezierCurveTo',[0.883,0.2,1.367,0,2,0],
    'moveTo',[11.35,6.8],
    'bezierCurveTo',[12.05,7.467,12.567,8.2,12.9,9],
    'bezierCurveTo',[13.033,9.4,13,9.783,12.8,10.15],
    'lineTo',[11.85,10.9],
    'lineTo',[10.6,10.85],
    'bezierCurveTo',[10.167,10.65,9.9,10.35,9.8,9.95],
    'lineTo',[9,8.9],
    'lineTo',[8.95,8.85],
    'bezierCurveTo',[8.417,8.283,7.75,8,6.95,8],
    'bezierCurveTo',[6.15,8,5.45,8.283,4.85,8.85],
    'lineTo',[4.85,8.9],
    'lineTo',[4.15,10.05],
    'lineTo',[3.25,10.85],
    'lineTo',[2.05,10.9],
    'lineTo',[1.15,10.1],
    'bezierCurveTo',[0.95,9.733,0.933,9.35,1.1,8.95],
    'bezierCurveTo',[1.433,8.217,1.867,7.533,2.4,6.9],
    'lineTo',[2.5,6.8],
    'bezierCurveTo',[3.767,5.6,5.25,5,6.95,5],
    'bezierCurveTo',[8.683,5,10.183,5.617,11.45,6.85],
    'lineTo',[11.35,6.8],
    'moveTo',[12,0],
    'bezierCurveTo',[12.567,0,13.033,0.2,13.4,0.6],
    'bezierCurveTo',[13.8,0.933,14,1.4,14,2],
    'bezierCurveTo',[14,2.6,13.8,3.1,13.4,3.5],
    'bezierCurveTo',[13.033,3.833,12.567,4,12,4],
    'bezierCurveTo',[11.367,4,10.883,3.833,10.55,3.5],
    'bezierCurveTo',[10.183,3.1,10,2.6,10,2],
    'bezierCurveTo',[10,1.4,10.183,0.933,10.55,0.6],
    'bezierCurveTo',[10.883,0.2,11.367,0,12,0],
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
