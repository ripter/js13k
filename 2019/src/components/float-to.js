
AFRAME.registerComponent('float-to', {
  schema: {
    targetPosition: {type: 'vec3'},
    speed: {type: 'number'},
  },

  init() {
    this.startingPosition = new THREE.Vector3();
    this.targetPosition = new THREE.Vector3();
    this.direction = 'target';

    this.el.object3D.getWorldPosition(this.startingPosition);
  },

  update(oldData) {
    this.targetPosition.copy(this.data.targetPosition);
  },

  tick(time, timeDelta) {
    const { speed } = this.data;
    const { targetPosition, direction } = this;
    const distance = this.el.object3D.position.distanceToSquared(targetPosition);

    // console.log('moving to', targetPosition, distance);
    this.el.object3D.lookAt(targetPosition);
    this.el.object3D.translateZ(speed);

    if (distance <= speed) {
      if (direction === 'target') {
        this.targetPosition.copy(this.startingPosition);
        this.direction = 'starting';
      }
      else {
        // completed bounce.
        this.el.removeAttribute('float-to');
      }

      // console.log('Move back!', distance, this.startingPosition);
      // return this.el.setAttribute('targetPosition', this.startingPosition);
    }
  },

});
