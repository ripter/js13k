const COLORS = ['#001f3f', '#7FDBFF', '#3D9970', '#01FF70', '#FF851B', '#85144b', '#B10DC9'];

AFRAME.registerComponent('selectable', {
  schema: {
  },

  init: function () {
    this.lastIndex = -1;
    ['click', 'triggerdown'].forEach((eventName) => {
      this.el.addEventListener(eventName, this);
    });
  },

  // tick(time, timeDelta) {
    // const { deltaTheta, radius } = this.data;
    // const { position } = this.el.object3D;
    // const { theta } = this;
    // const x = radius * Math.cos(theta);
    // const z = radius * Math.sin(theta);
    //
    // this.theta += deltaTheta;
    // position.set(x, position.y, z);
  // },

  handleEvent(event) {
    const { lastIndex } = this;
    let nextIndex = lastIndex;
    while (nextIndex === lastIndex) {
      nextIndex = THREE.Math.randInt(0, COLORS.length);
    }

    this.el.setAttribute('material', 'color', COLORS[nextIndex]);
    this.lastIndex = nextIndex;
  },
});
