
AFRAME.registerComponent('float-to', {
  schema: {
    targetPosition: {type: 'vec3'},
    speed: {type: 'number'},
    active: {default: true},
  },

  init() {
    // this.startingPosition = new THREE.Vector3();
    this.targetPosition = new THREE.Vector3();
    // this.direction = 'target';

    // this.el.object3D.getWorldPosition(this.startingPosition);
  },

  update(oldData) {
    this.targetPosition.copy(this.data.targetPosition);
  },

  tick(time, timeDelta) {
    if (!this.data.active) { return; }
    const { speed } = this.data;
    const { targetPosition } = this;
    const distance = this.el.object3D.position.distanceToSquared(targetPosition);

    // console.log('moving to', targetPosition, distance);
    this.el.object3D.lookAt(targetPosition);
    this.el.object3D.translateZ(speed);

    if (distance <= speed) {
      this.el.emit('float-completed', { el: this.el })
      this.el.setAttribute('active', false);
    }
  },

});
