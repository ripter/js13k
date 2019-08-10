const COLORS = ['red', 'green', 'blue'];

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.lastIndex = -1;
    ['click', 'triggerdown'].forEach((eventName) => {
      this.el.addEventListener(eventName, this);
    });
  },


  handleEvent(event) {
    let { lastIndex } = this;
    lastIndex = (lastIndex + 1) % COLORS.length;
    this.el.setAttribute('material', 'color', COLORS[lastIndex]);
    this.lastIndex = lastIndex;
    // console.log('I was clicked at: ', event.detail/*.intersection.point*/);
  },
});
