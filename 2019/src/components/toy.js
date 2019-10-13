import { EFFECTS } from '../consts/sounds.js';

const EVENTS = ['at-orbit', 'at-toybox', 'paired'];
AFRAME.registerComponent('toy', {
  schema: {
    key: {type: 'string'},
  },

  init() {
    this.soundSystem = this.el.sceneEl.systems.sound;
    this.elToybox = null;
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

    switch (event.type) {
      case 'paired':
        return this.moveToToybox(detail.elToybox);
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

  onMatchSucceed() {
    const { elToybox } = this;

    elToybox.emit('put-away', {
      toy: this.el,
    });
  },

  onMatchFailed() {
    this.moveToOrbit();
  },

});
