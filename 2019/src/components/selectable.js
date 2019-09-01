AFRAME.registerComponent('selectable', {
  schema: {
    active: {default: true},
    isSelected: {default: false},
  },

  init: function () {
    this.system = this.el.sceneEl.systems.game;
    this.lastIndex = -1;
    ['click', 'triggerdown'].forEach((eventName) => {
      this.el.addEventListener(eventName, this);
    });
  },

  update() {
    if (this.data.isSelected) {
      this.el.setAttribute('material', 'color', '#0074D9');
    }
    else {
      this.el.setAttribute('material', 'color', '#DDDDDD');
    }
  },

  handleEvent() {
    if (!this.data.active) { return; }
    // Notify the system we have been selected.
    this.system.setSelected(this.el);
  },
});
