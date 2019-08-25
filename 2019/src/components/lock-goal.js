import { updateElement } from '../utils/updateElement.js';

AFRAME.registerComponent('lock-goal', {
  schema: {
    active: {default: true},
    key: {type: 'string'},
    isUnlocked: {default: false},
  },

  update() {
    if (this.data.isUnlocked) {
      updateElement(this.el, {
        selectable: {active: false},
      });
      this.el.setAttribute('material', {
        opacity: 1,
        color: '#2ECC40',
      });
    }
    else {
      updateElement(this.el, {
        selectable: {active: true},
      });
      this.el.setAttribute('material', {
        opacity: 0.5,
        color: '#DDDDDD',
      });
    }
  },

});
