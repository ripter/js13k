AFRAME.registerComponent('orbit', {
  schema: {
    startTheta: {default: 0},
    deltaTheta: {type: 'number'},
    radius: {type: 'number'},
  },

  init: function () {
    this.theta = this.data.startTheta;
  },

  tick(time, timeDelta) {
    const { deltaTheta, radius } = this.data;
    const { position } = this.el.object3D;
    const { theta } = this;
    const x = radius * Math.cos(theta);
    const z = radius * Math.sin(theta);

    this.theta += deltaTheta;
    position.set(x, position.y, z);
  },
});
