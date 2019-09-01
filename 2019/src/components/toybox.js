
AFRAME.registerComponent('toybox', {
  schema: {
    key: {type: 'string'},
  },

  init() {
    ['selected', 'unselected'].forEach(eventName => {
      this.el.addEventListener(eventName, this);
    });
  },

  handleEvent(event) {
    // console.log('toybox.handleEvent', event.type, event);
    const elPlanes = this.el.querySelectorAll('a-plane');


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
      default:
        // warning?
    }
  },
});
