/**
 * Plays a string a-z with a piano sound.
 * copied from: https://xem.github.io/alphabet-piano/
 * @param  {string} melody - string of a-z chars of notes to play.
 * @param  {number} [noteLength=0.3] - length of each note.
 * @param  {String} [waveform='sine'] - sine, triangle, square, or sawtooth.
 */
export function playPiano(melody, noteLength=0.3, waveform='sine') {
  const actx = new AudioContext();
  const G = actx.createGain();
  G.connect(actx.destination);

  for(let i=0; i < melody.length; i++) {
    const note = actx.createOscillator();
    if (melody[i=+i] && melody[i] != "0") {
      const startTime = i*noteLength+.3;
      note.connect(G);
      note.start(startTime);
      note.frequency.setValueAtTime(440*1.06**(-105+melody.charCodeAt(i)),startTime);
      note.type = waveform;
      G.gain.setValueAtTime(.5,startTime),
      G.gain.setTargetAtTime(.001,startTime+.1,.05),
      note.stop(startTime+noteLength-.01);
    }
  }
}

// For Easy create/debuggin
window.playPiano = playPiano;
