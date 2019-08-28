import { songBackground } from '../sound/songBackground.js';

AFRAME.registerSystem('sound', {
  schema: {
    // autoplay: {default: false}
  },

  //
  // Lifecycle Method
  //
  init() {
    const bgMusic = songBackground();

    this.audioContext = null;
    this.queuedNotes = [];


    // Que up the bgMusic
    console.log('bgMusic', bgMusic);
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
    // Audio requires a user click to start, so use the VR enter/exit events.
    // this.sceneEl.addEventListener('enter-vr', () => {
    //   const elBGMusic = document.querySelector('#bgMusic');
    //   elBGMusic.components.sound.playSound();
    // });
    // this.sceneEl.addEventListener('exit-vr', () => {
    //   const elBGMusic = document.querySelector('#bgMusic');
    //   elBGMusic.components.sound.stopSound();
    // });
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
    notesToPlay.forEach(this.playNote.bind(this));

    // Update to the next note
    notesToPlay.forEach((note) => {
      const { done, value:[noteName, duration] } = note.noteIter.next();
      // update the note refrence
      note.startTime = currentTime;
      note.duration = duration;
      note.noteName = noteName;
    });

    // queuedNotes.forEach(([startTime, duration, noteIter]) => {
    //   const delta = currentTime - startTime;
    // });


    /*
    const nextQueuedNotes = queuedNotes.reduce((acc, song) => {
      const [startTime, duration, noteIter] = song;
      // Wait for the duration before playing the next note
      if (delta < duration) {
        acc.push(song);
        return acc;
      }
      // Que up the next note
      const [isDone, notePair] = noteIter.next();
      // If the song is over, remove it from the que
      if (isDone) { return acc; }

      // add the next note from the song
      acc.push([
        currentTime,
        notePair.duration,
        noteIter,
      ]);
    }, []);

    console.log('nextQueuedNotes', nextQueuedNotes);
    this.queuedNotes = nextQueuedNotes;
    */

    /*
    const { bgMusic, bgMusicLastNote } = this;
    let iter;

    // Play background music!
    const bgMusicDelta = currentTime - bgMusicLastNote;
    iter = bgMusic.next();
    if (!iter.done) {
      const [note, duration] = iter.value;
      // Is it time to play the next note?
      if (bgMusicDelta >= duration) {
        this.bgMusicLastNote = currentTime;
        console.log('note', note);
      }
    }
    */
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

  // Plays a queued note object
  playNote(note) {
    const { noteName, duration } = note;
    console.log('Beep boop', note);
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
});
