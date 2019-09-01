
AFRAME.registerComponent('float-to', {
  schema: {
    targetPosition: {type: 'vec3'},
    targetScale: {type: 'vec3'},
    speed: {type: 'number'},
    active: {default: false},
  },

  init() {
    console.log('float-to: init', this.el, this);
    this.targetPosition = new THREE.Vector3();
    this.totalDistance = 0;
  },

  update() {
    console.log('float-to: update', this.data);
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
      this.el.emit('float-completed', { el: this.el });
      // This doesn't seem to work 🙁
      // this.el.setAttribute('active', false);
    }
  },

});
