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

    this.audioContext = null;
    this.queuedNotes = [];
    this.voices = {};

    // Start playing background music
    this.playEffect(MUSIC_BACKGROUND, true);

    // Setup Events
    this.sceneEl.addEventListener('enter-vr', this);
    this.sceneEl.addEventListener('exit-vr', this);
    window.addEventListener('click', this);
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
    switch(event.type) {
      case 'click':
      case 'enter-vr':
        window.removeEventListener('click', this);
        this.createAudioContext();
        break;
      case 'exit-vr':
        this.dispose();
        break;
      default:
        // console.error(`sound system does not have an event handler for "${event.type}"`);
    }
  },

  //
  // API
  //

  playEffect(effect, repeat = false) {
    // Turn the effect into a note Generator
    const noteIter = songGenerator(effect, repeat);
    // Add the first note to the que
    const {value: [noteName, duration]} = noteIter.next();
    this.queuedNotes.push({
      startTime: -1,
      duration,
      noteName,
      noteIter,
    });
  },

  createAudioContext() {
    if (this.audioContext) { return; }
    // Create the audio context so we can make some sounds!
    // We still need webkitAudioContext for Safari 🙄
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
