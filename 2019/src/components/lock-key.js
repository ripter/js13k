import { updateElement } from '../utils/updateElement.js';

const EVENTS = ['float-completed'];
/**
 * Lets the entity be used as a 'key' to a phyiscal 'lock'.
 * Manages `float-to` and `orbit` components shared on the entity.
 *
 * @type {Component}
 */
AFRAME.registerComponent('lock-key', {
  schema: {
    active: {default: true},
    elLock: {type: 'selector'},
    key: {type: 'string'},
  },

  init() {
    this.lockPosition = new THREE.Vector3();
    this.orbitPosition = new THREE.Vector3();
    this.didTest = false;
  },

  play() {
    EVENTS.forEach(eventName => this.el.addEventListener(eventName, this));
  },

  pause() {
    EVENTS.forEach(eventName => this.el.removeEventListener(eventName, this));
  },

  // sync local refrences when the data changes.
  update(oldData) {
    if (null !== this.data.elLock
      && oldData.elLock !== this.data.elLock) {
      // Start floating when the lock changes.
      this.floatToLock();
    }
  },


  handleEvent(event) {
    if (event.type !== 'float-completed') { return; }
    const { toLock } = this;
    const { elLock, key } = this.data;
    const keyNeeded = elLock.getAttribute('key-needed');

    // If it reached the lock
    if (toLock) {
      // Do we have the correct key for the lock?
      if (key === keyNeeded) {
        this.matchLock();
      } else {
        this.floatToOrbit();
      }
    }
    // if it reached orbit
    else {
      this.resumeOrbit();
    }
  },


  //
  // Actions
  //

  // floats the element to the lockPosition.
  floatToLock() {
    this.toLock = true;
    // Get a copy of the positions
    this.orbitPosition.copy(this.el.object3D.position);
    this.data.elLock.object3D.getWorldPosition(this.lockPosition);

    // update the components
    updateElement(this.el, {
      orbit: {
        active: false,
      },
      'float-to': {
        targetPosition: this.lockPosition,
        targetScale: {x: 0.25, y: 0.25, z: 0.25},
        active: true,
      },
      // material: {
      //   color: '#FF4136',
      // },
    });
  },

  // floats the element to orbitPosition
  floatToOrbit() {
    this.toLock = false;
    // update the components
    updateElement(this.el, {
      orbit: {
        active: false,
      },
      'float-to': {
        targetPosition: this.orbitPosition,
        targetScale: {x: 1, y: 1, z: 1},
        active: true,
      },
      material: {
        color: '#FF4136',
      },
    });
  },

  // Stops floating and starts orbiting
  resumeOrbit() {
    updateElement(this.el, {
      orbit: {
        active: true,
      },
      'float-to': {
        active: false,
      },
      material: {
        color: '#DDDDDD',
      },
    });
  },

  matchLock() {
    const { elLock } = this.data;
    // disable and hide the item.
    updateElement(this.el, {
      'float-to': {
        active: false,
      },
      selectable: {
        active: false,
      },
      visible: false,
    });
    //
  },

});
