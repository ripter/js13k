// const EVENTS = ['selected', 'unselected'];

AFRAME.registerComponent('orbit', {
  schema: {
    startTheta: {default: 0},
    deltaTheta: {type: 'number'},
    radius: {type: 'number'},
    active: {default: true},
    center: {type: 'vec3', default: {x: 0, y:0, z:0}},
  },

  init: function () {
    this.theta = this.data.startTheta;
  },

  // play() {
  //   EVENTS.forEach(eventName => this.el.addEventListener(eventName, this));
  // },
  //
  // pause() {
  //   EVENTS.forEach(eventName => this.el.removeEventListener(eventName, this));
  // },

  // update(oldData) {
    // console.log('orbit update', oldData);
    // this.targetPosition.copy(this.data.targetPosition);
  // },

  // Update position to orbit around the center
  tick(time, timeDelta) {
    if (!this.data.active) { return; }
    const { center, deltaTheta, radius } = this.data;
    const { position } = this.el.object3D;
    const { theta } = this;
    const x = center.x + radius * Math.cos(theta);
    const z = center.y + radius * Math.sin(theta);

    this.theta += deltaTheta;
    position.set(x, position.y, z);
  },

  // handleEvent(event) {
  //   console.log('orbit.handleEvent', event.type, event);
  // },
});
