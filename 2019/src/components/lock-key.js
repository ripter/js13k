import { updateElement } from '../utils/updateElement.js';
import { EFFECTS } from '../consts/sounds.js';

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
    this.system = this.el.sceneEl.systems.game;
    this.soundSystem = this.el.sceneEl.systems.sound;
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
      }
      else {
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
    console.log('floating to lock', this);
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
    });
    this.soundSystem.playEffect(EFFECTS.FLOAT_TO_LOCK);
  },

  // Failed match with lock.
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
      selectable: {
        isSelected: false,
        active: true,
      },
    });
    this.el.setAttribute('material', {
      color: '#FF4136',
    });

    // Notify the lock that the key failed.
    updateElement(this.data.elLock, {
      'lock-goal': {
        isUnlocked: false,
      },
      selectable: {
        isSelected: false,
        active: true,
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
    });
    this.el.setAttribute('material', {
      color: '#DDDDDD',
    });
  },

  // Successful match with the lock!
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
    // Notify the lock that the key worked.
    updateElement(elLock, {
      'lock-goal': {
        isUnlocked: true,
      },
    });
    // Notify the system it worked.
    // Failed match with lock.
    this.system.unlockGoal(this.el, elLock);
  },

});
