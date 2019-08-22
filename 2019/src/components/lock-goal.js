
AFRAME.registerComponent('lock-goal', {
  schema: {
    active: {default: true},
    key: {type: 'string'},
    isOpen: {default: false},
  },

  update(oldData) {
    if (this.data.isOpen) {
      //         material="color: #7FDBFF; transparent: true; opacity: 0.5;"
      this.el.setAttribute('material', {
        opacity: 1,
        color: '#2ECC40',
      });
    } else {
      this.el.setAttribute('material', {
        opacity: 0.5,
        color: '#DDDDDD',
      });
    }
  },

});
