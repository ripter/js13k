
AFRAME.registerComponent('float-to', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'},
  },

  init() {
    this.velocity = new THREE.Vector3(0, 0, 0.01);
  },

  tick(time, timeDelta) {
    const { position } = this.el.object3D;
    const target = this.data.target.object3D;
    const distance = position.distanceToSquared(target.position);


    if ((0|distance) <= 0) {
      console.log('DONe', distance);
      this.el.removeAttribute('float-to');
    }

    this.el.object3D.lookAt(target.position);
    position.add(this.getMovementVector(timeDelta));
  },

  getMovementVector: (function () {
    var directionVector = new THREE.Vector3(0, 0, 0);
    var rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

    return function (delta) {
      var rotation = this.el.getAttribute('rotation');
      var velocity = this.velocity;
      var xRotation;

      directionVector.copy(velocity);
      directionVector.multiplyScalar(delta);

      // Absolute.
      // if (!rotation) { return directionVector; }

      xRotation = rotation.x;

      // Transform direction relative to heading.
      rotationEuler.set(THREE.Math.degToRad(xRotation), THREE.Math.degToRad(rotation.y), 0);
      directionVector.applyEuler(rotationEuler);
      return directionVector;
    };
  })(),

});
