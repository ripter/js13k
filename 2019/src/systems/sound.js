import { noteNameToFreq } from '../utils/noteNameToFreq.js';
import { playNote } from '../sound/playNote.js';
import { songGenerator } from '../sound/songGenerator.js';
import { HUMAN_MUSIC, TTLS } from '../consts/sounds.js';

AFRAME.registerSystem('sound', {
  //
  // Lifecycle Method
  //
  init() {
    this.audioContext = null;
    this.queuedNotes = [];

    // Start playing background music
    if(document.monetization && document.monetization.state === 'started') {
      // Paying users get upgraded sound`
      this.replaceBackgroundMusic(TTLS);
    }
    else {
      // Free users get Rick and Morty Refrence
      this.replaceBackgroundMusic(HUMAN_MUSIC);
    }

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
      const freq = noteNameToFreq(noteName);
      playNote(this.audioContext, freq, duration);
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

  playEffect(effect, repeat = false, effectName = '') {
    // Turn the effect into a note Generator
    const noteIter = songGenerator(effect, repeat);
    // Add the first note to the que
    const {value: [noteName, duration]} = noteIter.next();
    this.queuedNotes.push({
      startTime: -1,
      duration,
      noteName,
      noteIter,
      effectName,
    });
  },

  // replaces the old background music with a new one.
  replaceBackgroundMusic(trackList) {
    const NAME = 'background-music';
    // Remove the old background music
    this.queuedNotes = this.queuedNotes.filter(trackMeta => trackMeta.effectName !== NAME);
    // Play all the tracks in the new music
    trackList.forEach(track => {
      this.playEffect(track, true, NAME);
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
});
