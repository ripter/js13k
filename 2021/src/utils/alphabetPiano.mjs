import { NOTE_DURATION, TEMPO } from '../consts/music.mjs';

/**
 * Plays a string with a piano sound.
 * Added ability for each note to define length with a pair of chars.
 * Inspired & heavily borrowed from: https://xem.github.io/alphabet-piano/
 * @param  {string} melody - string of charCode/Duration pairs.
 * @example - "aWbH" Duration W, H, Q, E, S
 * @param  {String} [waveform='sine'] - sine, triangle, square, or sawtooth.
 */
export function playPiano(melody, maxGain = 0.5, waveform='sine') {
  const actx = new AudioContext();
  const gainNode = new GainNode(actx, { gain: 0 });
  const oscillatorNode = new OscillatorNode(actx, { type: waveform });

  oscillatorNode.connect(gainNode);
  gainNode.connect(actx.destination);

  let runningTime = 0;
  for(let i=0; i < melody.length; i += 2) {
    const freq = 440*1.06**(-105+melody.charCodeAt(i));
    const noteLength = 60 / TEMPO * NOTE_DURATION[melody[i+1]];
    const startTime = runningTime;
    const endTime = startTime+noteLength;
    runningTime = endTime;

    // bail if the note is 0
    if (melody[i] === '0') { continue; }

    // console.log(melody[i], freq);
    // console.group('note');
    // console.log('note', melody[i]);
    // console.log('frequency', freq);
    // console.groupEnd();

    // Change the frequency for each note when it starts.
    oscillatorNode.frequency.setValueAtTime(freq, startTime);
    // Create a "beat" by turning up and down the gain.
    gainNode.gain.setTargetAtTime(maxGain, startTime, 0.05);
    gainNode.gain.setTargetAtTime(0, endTime-0.1, 0.05);
  }

  // run the oscillator node for the length of the melody.
  oscillatorNode.start();
  oscillatorNode.stop(runningTime);

  oscillatorNode.onended = () => {
    // oscillatorNode.disconnect();
    // gainNode.disconnect();
    // actx.close();
  };
}



// For Easy create/debuggin
window.playPiano = playPiano;
