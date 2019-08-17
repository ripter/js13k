
AFRAME.registerComponent('float-to', {
  schema: {
    targetPosition: {type: 'vec3'},
    speed: {type: 'number'},
  },

  init() {
    this.velocity = new THREE.Vector3(0, 0, 0.01);
  },

  tick(time, timeDelta) {
    const { targetPosition, speed } = this.data;
    // const { position } = this.el.object3D;
    // const target = this.data.target.object3D;
    // const targetPosition = this.data.position ? this.data.position : this.data.target.object3D.position;
    // const targetPosition = this.data.target ? this.data.target.object3D.position : this.data.position;
    // const targetPosition = this.data.target.object3D.position;
    // const targetPosition = this.data.position;
    console.group('float-to.update');
    console.log('this.el.object3D.position', this.el.object3D.position);
    console.log('targetPosition', targetPosition);
    const distance = this.el.object3D.position.distanceToSquared(targetPosition);
    console.log('distance', distance);

    // console.log('float-to', this.el);
    if ((0|distance) <= 0) {
      console.log('self-remove float-to', distance);
      this.el.removeAttribute('float-to');
    }

    this.el.object3D.lookAt(targetPosition);
    this.el.object3D.translateZ(speed);

    console.groupEnd();
  },

});
