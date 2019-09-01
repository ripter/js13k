// Entity will circle around the center point.
AFRAME.registerComponent('orbit', {
  schema: {
    startTheta: {default: 0},
    deltaTheta: {type: 'number'},
    radius: {type: 'number'},
    active: {default: true},
    center: {type: 'vec3'},
  },

  init() {
    this.theta = this.data.startTheta;

    this.cameraPosition = (document.querySelector('#camera')).getAttribute('position');
  },

  // Update position to orbit around the center
  tick() {
    if (!this.data.active) { return; }
    const { center, deltaTheta, radius } = this.data;
    const { position } = this.el.object3D;
    const { theta, cameraPosition } = this;
    const x = center.x + radius * Math.cos(theta);
    const z = center.y + radius * Math.sin(theta);

    this.el.object3D.lookAt(cameraPosition);
    this.theta += deltaTheta;
    position.set(x, position.y, z);
  },
});
