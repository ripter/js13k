import { formatTime } from '../utils/formatTime.js';

AFRAME.registerComponent('timer', {
  schema: {
    active: {default: true}, // active turns on/off the component from working at all.
    isPlaying: {default: false}, // isPlaying turns on/off the timing
  },

  init: function () {
    this.system = this.el.sceneEl.systems.game;
    this.milliseconds = 0;
  },

  update(oldData) {
    // handle isPlaying toggle
    console.group('update');
    console.log('newData', this.data);
    console.log('oldData', oldData);
    console.groupEnd();
  },

  tick(time, timeDelta) {
    if (!this.data.active || !this.data.isPlaying) { return; }
    this.milliseconds += timeDelta;
    this.el.setAttribute('text', {
      value: `${formatTime(this.milliseconds)}`,
    });
  },

});
