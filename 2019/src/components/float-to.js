
AFRAME.registerComponent('float-to', {
  schema: {
    targetPosition: {type: 'vec3'},
    targetScale: {type: 'vec3'},
    speed: {type: 'number'},
    active: {default: false},
    eventName: {default: 'float-completed'}
  },

  init() {
    this.targetPosition = new THREE.Vector3();
    this.totalDistance = 0;
  },

  update() {
    this.targetPosition.copy(this.data.targetPosition);
    this.totalDistance = this.el.object3D.position.distanceToSquared(this.data.targetPosition);
  },

  tick() {
    if (!this.data.active) { return; }
    const { speed, targetScale } = this.data;
    const { targetPosition, totalDistance } = this;
    const distance = this.el.object3D.position.distanceToSquared(targetPosition);
    const alpha = (totalDistance - distance) / totalDistance;

    this.el.object3D.lookAt(targetPosition);
    this.el.object3D.translateZ(speed);
    this.el.object3D.scale.lerp(targetScale, alpha);

    if (distance <= speed) {
      this.el.setAttribute('float-to', 'active', false);
      this.el.emit(this.data.eventName, { el: this.el });
    }
  },

});
