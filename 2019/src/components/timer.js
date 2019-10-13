import { formatTime } from '../utils/formatTime.js';
// import { EFFECTS } from '../consts/sounds.js';

AFRAME.registerComponent('timer', {
  schema: {
    active: {default: true}, // active turns on/off the component from working at all.
    isPlaying: {default: false}, // isPlaying turns on/off the timing
  },

  init: function () {
    this.system = this.el.sceneEl.systems.game;
    // this.soundSystem = this.el.sceneEl.systems.sound;
    this.milliseconds = 0;
  },

  tick(time, timeDelta) {
    if (!this.data.active || !this.data.isPlaying) { return; }
    const oldSeconds = 0|this.milliseconds / 1000;
    this.milliseconds += timeDelta;
    const newSeconds = 0|this.milliseconds / 1000;

    if (oldSeconds === newSeconds) {
      return;
    }

    this.el.setAttribute('text', {
      value: `${formatTime(this.milliseconds)}`,
    });

    // this.soundSystem.playEffect(EFFECTS.TIMER_TICK);
  },

});
