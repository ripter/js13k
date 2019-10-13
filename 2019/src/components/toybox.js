import { EFFECTS } from '../consts/sounds.js';

const EVENTS = ['selected', 'unselected', 'put-away'];
AFRAME.registerComponent('toybox', {
  schema: {
    key: {type: 'string'},
    totalToys: {type: 'int'},
    isFull: {default: false},
  },

  init() {
    this.system = this.el.sceneEl.systems.game;
    this.soundSystem = this.el.sceneEl.systems.sound;
    this.elPlanes = this.el.querySelectorAll('a-plane');
    this.putAwayCount = 0;
    this.leftToPutAway = this.data.totalToys;
  },

  play() {
    EVENTS.forEach(eventName => this.el.addEventListener(eventName, this));
  },
  pause() {
    EVENTS.forEach(eventName => this.el.removeEventListener(eventName, this));
  },

  handleEvent(event) {
    const { leftToPutAway } = this;

    switch (event.type) {
      case 'selected':
        if (leftToPutAway === 0) { return false; }
        return this.colorModel('#0074D9');
      case 'unselected':
        if (leftToPutAway === 0) { return false; }
        return this.colorModel('#DDDDDD');
      case 'put-away':
        return this.putAway(event.detail.toy);
      default:
        // warning?
    }
    return false;
  },

  putAway(/*toy*/) {
    this.putAwayCount += 1;
    this.leftToPutAway = this.data.totalToys - this.putAwayCount;

    if (this.leftToPutAway === 0) {
      this.colorModel('#2ECC40');
      this.el.setAttribute('toybox', 'isFull', true);
      this.system.toyboxFilled(this.el);
      this.soundSystem.playEffect(EFFECTS.WIN);
    }
  },

  colorModel(color) {
    const { elPlanes } = this;
    elPlanes.forEach(el => {
      el.setAttribute('material', 'color', color);
    });
  },
});
