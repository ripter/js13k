const COLORS = ['#001f3f', '#7FDBFF', '#3D9970', '#01FF70', '#FF851B', '#85144b', '#B10DC9'];

AFRAME.registerComponent('selectable', {
  schema: {
  },

  init: function () {
    this.system = this.el.sceneEl.systems.game;
    this.lastIndex = -1;
    ['click', 'triggerdown'].forEach((eventName) => {
      this.el.addEventListener(eventName, this);
    });
  },

  handleEvent(event) {
    console.log('selectable', event.type, event);
    const { lastIndex } = this;
    let nextIndex = lastIndex;
    while (nextIndex === lastIndex) {
      nextIndex = THREE.Math.randInt(0, COLORS.length-1);
    }

    this.el.setAttribute('material', 'color', COLORS[nextIndex]);
    this.lastIndex = nextIndex;

    // Notify the system we have been selected.
    this.system.setSelected(this.el);
  },
});
