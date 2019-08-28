import { noteNameToFreq } from '../utils/noteNameToFreq.js';
import { Voice } from '../sound/Voice.js';
import { songGenerator } from '../sound/songGenerator.js';
import { MUSIC_BACKGROUND } from '../consts/sounds.js';

AFRAME.registerSystem('sound', {
  schema: {
    // autoplay: {default: false}
  },

  //
  // Lifecycle Method
  //
  init() {
    const bgMusic = songGenerator(MUSIC_BACKGROUND, true);

    this.audioContext = null;
    this.queuedNotes = [];
    this.voices = {};


    // Que up the bgMusic
    const {isDone, value: [noteName, duration]} = bgMusic.next();
    this.queuedNotes.push({
      startTime: -1,
      duration,
      noteName,
      noteIter: bgMusic,
    });


    // Setup Events
    this.sceneEl.addEventListener('enter-vr', this);
    this.sceneEl.addEventListener('exit-vr', this);
    window.addEventListener('click', this);
  },

  play() {
    console.log('sound system .play', this);
  },

  pause() {
    console.log('sound system .pause', this);
  },

  tick() {
    if (!this.audioContext) { return; }
    const { queuedNotes } = this;
    const { currentTime } = this.audioContext;

    // Find the notes we can play this tick
    const notesToPlay = queuedNotes.filter(note => {
      const delta = currentTime - note.startTime;
      return delta > note.duration;
    });

    // Play them notes!
    notesToPlay.forEach((note) => {
      const { noteName, duration } = note;
      const voice = this.getVoice(noteName);
      voice.play(duration);
    });

    // Update to the next note
    notesToPlay.forEach((note) => {
      const { done, value } = note.noteIter.next();

      // If there is no next note, remove it from the que
      if (done) {
        const index = queuedNotes.indexOf(note);
        console.log('removing note at index', index);
        this.queuedNotes.splice(index, 1);
        return;
      }

      const [noteName, duration] = value;
      // update the note refrence
      note.startTime = currentTime;
      note.duration = duration;
      note.noteName = noteName;

    });
  },

  handleEvent(event) {
    console.log('sound system event', event.type, event);
    switch(event.type) {
      case 'click':
      case 'enter-vr':
        window.removeEventListener('click', this);
        this.createAudioContext();
        break;
      case 'exit-vr':
        this.dispose();
      default:
        console.error(`sound system does not have an event handler for "${event.type}"`)
    }
  },

  //
  // API
  //

  playEffect(effect) {
    console.log('play effect', effect);
  },

  createAudioContext() {
    if (this.audioContext) { return; }
    // Create the audio context so we can make some sounds!
    // We still need webkitAudioContext for Safari 🙄
    return this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  },

  dispose() {
    if (!this.audioContext) { return; }
    // Close and clear the refrence
    this.audioContext.close();
    this.audioContext = null;
  },

  getVoice(noteName) {
    const { audioContext } = this;
    let voice = this.voices[noteName];

    // Create a new voice if we don't have one yet.
    if (!voice) {
      voice = new Voice(audioContext, noteNameToFreq(noteName));
      this.voices[noteName] = voice;
    }

    return voice;
  },
});
