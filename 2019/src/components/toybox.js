
const EVENTS = ['selected', 'unselected', 'put-away'];
AFRAME.registerComponent('toybox', {
  schema: {
    key: {type: 'string'},
    totalToys: {type: 'int'},
    isFull: {default: false},
  },

  init() {
    this.system = this.el.sceneEl.systems.game;
    this.elPlanes = this.el.querySelectorAll('a-plane');
    this.putAwayCount = 0;
  },

  play() {
    EVENTS.forEach(eventName => this.el.addEventListener(eventName, this));
  },
  pause() {
    EVENTS.forEach(eventName => this.el.removeEventListener(eventName, this));
  },

  handleEvent(event) {
    const { elPlanes } = this;

    switch (event.type) {
      case 'selected':
        elPlanes.forEach(el => {
          el.setAttribute('material', 'color', '#0074D9');
        });
        return true;
      case 'unselected':
        elPlanes.forEach(el => {
          el.setAttribute('material', 'color', '#DDDDDD');
        });
        return true;
      case 'put-away':
        return this.putAway(event.detail.toy);
      default:
        // warning?
    }
    return false;
  },

  putAway(/*toy*/) {
    this.putAwayCount += 1;
    const leftToPutAway = this.data.totalToys - this.putAwayCount;

    if (leftToPutAway === 0) {
      this.el.setAttribute('toybox', 'isFull', true);
      this.system.toyboxFilled(this.el);
    }
  },
});
