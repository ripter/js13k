import { updateElement } from '../utils/updateElement.js';
import { EFFECTS } from '../consts/sounds.js';

const EVENTS = ['float-completed', 'selected', 'paired'];
/**
 * Lets the entity be used as a 'key' to a phyiscal 'lock'.
 * Manages `float-to` and `orbit` components shared on the entity.
 *
 * @type {Component}
 */
AFRAME.registerComponent('toy', {
  schema: {
    active: {default: true},
    // elLock: {type: 'selector'},
    toyboxPosition: {type: 'vec3'},
    key: {type: 'string'},
  },

  init() {
    this.system = this.el.sceneEl.systems.game;
    this.soundSystem = this.el.sceneEl.systems.sound;
    this.lockPosition = new THREE.Vector3();
    this.orbitPosition = new THREE.Vector3();
  },

  play() {
    EVENTS.forEach(eventName => this.el.addEventListener(eventName, this));
  },

  pause() {
    EVENTS.forEach(eventName => this.el.removeEventListener(eventName, this));
  },


  handleEvent(event) {
    const { detail } = event;
    // console.log('toy.handleEvent', event.type, detail, event);

    switch (event.type) {
      case 'paired':
        this.moveToToybox(detail.position);
        break;
      case 'selected':
        break;
      case 'float-completed':
        break;
      default:
        // ignore
    }
  },


  //
  // Actions
  //

  moveToToybox(position) {
    const elParent = this.el.closest('[float-to]');
    console.log('moveToToybox', position, elParent);
    this.el.setAttribute('orbit', 'active', false);
    elParent.setAttribute('float-to', {
      targetPosition: position,
      targetScale: {x: 0.25, y: 0.25, z: 0.25},
      active: true,
    });
    this.soundSystem.playEffect(EFFECTS.FLOAT_TO_LOCK);
  },

  // floats the element to the lockPosition.
  // floatToLock() {
  //   this.toLock = true;
  //   // Get a copy of the positions
  //   // this.orbitPosition.copy(this.el.object3D.position);
  //   // this.data.elLock.object3D.getWorldPosition(this.lockPosition);
  //
  //   // update the components
  //   updateElement(this.el, {
  //     orbit: {
  //       active: false,
  //     },
  //     'float-to': {
  //       // targetPosition: this.lockPosition,
  //       targetPosition: this.toyboxPosition,
  //       targetScale: {x: 0.25, y: 0.25, z: 0.25},
  //       active: true,
  //     },
  //   });
  //   this.soundSystem.playEffect(EFFECTS.FLOAT_TO_LOCK);
  // },

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

    this.onMatchFailed();
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
    this.onMatchSucceed();
  },


  onMatchSucceed() {
    const { elLock } = this.data;
    this.el.emit('match-succeed');
    elLock.emit('match-succeed');
  },

  onMatchFailed() {
    const { elLock } = this.data;
    this.el.emit('match-failed');
    elLock.emit('match-failed');
  },

});
