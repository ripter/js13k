import { updateElement } from '../utils/updateElement.js';

const EVENTS = ['float-completed'];
/**
 * Lets the entity be used as a 'key' to a phyiscal 'lock'.
 * Manages `float-to` and `orbit` components shared on the entity.
 *
 * @type {Component}
 */
AFRAME.registerComponent('lockAndKey', {
  schema: {
    active: {default: true},
    elLock: {type: 'selector'},
    key: {type: 'string'},
  },

  init() {
    this.lockPosition = new THREE.Vector3();
  },

  play() {
    EVENTS.forEach(eventName => this.el.addEventListener(eventName, this));
  },

  pause() {
    EVENTS.forEach(eventName => this.el.removeEventListener(eventName, this));
  },

  // sync local refrences when the data changes.
  update(oldData) {
    // Start floating when the lock changes.
    if (oldData.elLock !== this.data.elLock) {
      console.log('lockAndKey.update', this.data.elLock);
      this.data.elLock.object3D.getWorldPosition(this.lockPosition);
      this.floatToLock();
    }
  },

  handleEvent(event) {
     // console.log('Event:', event.type, event);
     switch (event.type) {
       case 'float-completed':
         this.el.setAttribute('float-to', {active: false});
         this.checkKeyWithLock();
         break;
       default:
        console.warn('unhandled event', event);
     }
  },

  // tick(time, timeDelta) {
  //   if (!this.data.active) { return; }
  // },

  floatToLock() {
    // console.log('Start float to lock');
    const props = {
      orbit: {
        active: false,
      },
      'float-to': {
        targetPosition: this.lockPosition,
        active: true,
      },
    };

    updateElement(this.el, props);
  },

  checkKeyWithLock() {
    const { elLock, key } = this.data;
    const keyNeeded = elLock.getAttribute('keyNeeded');

    console.log('key', key);
    console.log('keyNeeded', keyNeeded);

    if (key === keyNeeded) {
      console.log('MATCH');
      // Lock the item and prevent the lock from being selectable for the rest of the game.
    } else {
      console.log('float back');
      this.el.setAttribute('orbit', {active: true});
    }
  },
});
