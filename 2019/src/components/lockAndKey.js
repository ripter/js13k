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
    lock: {type: 'selector'},
    // targetPosition: {type: 'vec3'},
    // speed: {type: 'number'},
    // active: {default: true},
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
    console.log('lockAndKey.update', oldData);
    // Start floating when the lock changes.
    if (oldData.lock !== this.data.lock) {
      /*
      // Get the goal's world position.
selectedGoal.object3D.getWorldPosition(goalPosition);
// Start the lock & key
selectedItem.setAttribute('lockAndKey', {
  lock: goalPosition,
});

       */
      this.lockPosition.copy(this.data.lock);
      this.floatToLock();
    }
  },

  handleEvent(event) {
     console.log('Event:', event.type, event);
     switch (event.type) {
       case 'float-completed':
         console.log('test if lock and key match');
         this.el.setAttribute('float-to', {active: false});
         break;
       default:

     }
  },

  // tick(time, timeDelta) {
  //   if (!this.data.active) { return; }
  // },

  floatToLock() {
    console.log('Start float to lock');
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
});
