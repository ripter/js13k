const COLORS = ['#001f3f', '#7FDBFF', '#3D9970', '#01FF70', '#FF851B', '#85144b', '#B10DC9'];

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
