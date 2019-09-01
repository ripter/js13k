// import { updateElement } from '../utils/updateElement.js';
import { EFFECTS } from '../consts/sounds.js';

const EVENTS = ['selected', 'paired', 'at-toybox', 'at-orbit'];
AFRAME.registerComponent('toy', {
  schema: {
    active: {default: true},
    toyboxPosition: {type: 'vec3'},
    key: {type: 'string'},
  },

  init() {
    // this.system = this.el.sceneEl.systems.game;
    this.soundSystem = this.el.sceneEl.systems.sound;
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
    console.log('toy.handleEvent', event.type, detail, event);

    switch (event.type) {
      case 'paired':
        return this.moveToToybox(detail.elToybox);
      case 'selected':
        break;
      case 'at-toybox':
        if (this.canPutToyInBox()) {
          return this.onMatchSucceed();
        }
        return this.onMatchFailed();
      case 'at-orbit':
        return this.resumeOrbit();
      default:
        // ignore
    }
    return false;
  },


  //
  // Actions
  //

  // Activate the components to move the toy to the toybox
  moveToToybox(elToybox) {
    const position = this.el.getAttribute('position');
    const toyboxPosition = elToybox.getAttribute('position');
    // update state
    this.elToybox = elToybox;
    this.orbitPosition.copy(position);
    // start effects
    this.moveTo({
      position: toyboxPosition,
      scale: {x: 0.25, y: 0.25, z: 0.25},
      eventName: 'at-toybox',
    });
    this.soundSystem.playEffect(EFFECTS.MOVE_TO_TOYBOX);
  },

  moveToOrbit() {
    console.log('moving to orbit', this.orbitPosition);
    // start effects
    this.moveTo({
      position: this.orbitPosition,
      scale: {x: 1, y: 1, z: 1},
      eventName: 'at-orbit',
    });
    this.soundSystem.playEffect(EFFECTS.MOVE_TO_ORBIT);
  },

  resumeOrbit() {
    this.el.setAttribute('orbit', 'active', true);
  },


  // Sets float-to to move the entity
  moveTo({position, scale, eventName}) {
    this.el.setAttribute('orbit', 'active', false);
    this.el.setAttribute('float-to', {
      targetPosition: position,
      targetScale: scale,
      active: true,
      eventName,
    });
  },

  // Returns bool if the toy can be put into the toyboy
  canPutToyInBox() {
    const { elToybox } = this;
    const key = elToybox.getAttribute('toybox').key;
    return key === this.data.key;
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
  // floatToOrbit() {
  //   this.toLock = false;
  //   // update the components
  //   updateElement(this.el, {
  //     orbit: {
  //       active: false,
  //     },
  //     'float-to': {
  //       targetPosition: this.orbitPosition,
  //       targetScale: {x: 1, y: 1, z: 1},
  //       active: true,
  //     },
  //     selectable: {
  //       isSelected: false,
  //       active: true,
  //     },
  //   });
  //   this.el.setAttribute('material', {
  //     color: '#FF4136',
  //   });
  //
  //   this.onMatchFailed();
  // },

  // Stops floating and starts orbiting
  // resumeOrbit() {
  //   console.log('resumeOrbit', this.el);
  //   debugger;
  //   updateElement(this.el, {
  //     orbit: {
  //       active: true,
  //     },
  //     'float-to': {
  //       active: false,
  //     },
  //   });
  //   this.el.setAttribute('material', {
  //     color: '#DDDDDD',
  //   });
  // },

  // Successful match with the lock!
  // matchLock() {
  //   // disable and hide the item.
  //   updateElement(this.el, {
  //     'float-to': {
  //       active: false,
  //     },
  //     selectable: {
  //       active: false,
  //     },
  //     visible: false,
  //   });
  //   this.onMatchSucceed();
  // },


  onMatchSucceed() {
    console.log('Matched!');
    // const { elLock } = this.data;
    // this.el.emit('match-succeed');
    // elLock.emit('match-succeed');
  },

  onMatchFailed() {
    console.log('Rejected!');
    this.moveToOrbit();
    // const { elLock } = this.data;
    // this.el.emit('match-failed');
    // elLock.emit('match-failed');
  },

});
