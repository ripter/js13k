AFRAME.registerComponent('selectable', {
  schema: {
    active: {default: true},
    isSelected: {default: false},
    type: {default: 'Toy'},
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
      this.el.emit('selected');
    }
    else {
      this.el.emit('unselected');
    }
  },

  handleEvent() {
    if (!this.data.active) { return; }
    // Notify the system we have been selected.
    this.system.setSelected(this.el);
    this.el.setAttribute('selectable', 'isSelected', true);
  },
});
