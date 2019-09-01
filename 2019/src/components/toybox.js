
const EVENTS = ['selected', 'unselected', 'put-away'];
AFRAME.registerComponent('toybox', {
  schema: {
    key: {type: 'string'},
    totalToys: {type: 'int'},
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
    // console.log('toybox.handleEvent', event.type, event);
    // const elPlanes = this.el.querySelectorAll('a-plane');
    const { elPlanes } = this;

    switch (event.type) {
      case 'selected':
        elPlanes.forEach(el => {
          el.setAttribute('material', 'color', '#0074D9');
        });
        return;
      case 'unselected':
        elPlanes.forEach(el => {
          el.setAttribute('material', 'color', '#DDDDDD');
        });
        return;
      case 'put-away':
        return this.putAway(event.detail.toy);
      default:
        // warning?
    }
  },

  putAway(toy) {
    this.putAwayCount += 1;
    console.log('putting away the toy', toy);
    console.log('There are ', this.data.totalToys - this.putAwayCount, 'toys left');
  },
});
