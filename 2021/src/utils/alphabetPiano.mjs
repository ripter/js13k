import { NOTE_DURATION, TEMPO } from '../consts/music.mjs';

/**
 * Plays a string a-z with a piano sound.
 * Inspired & heavily borrowed from: https://xem.github.io/alphabet-piano/
 * @param  {string} melody - string of charCode/Duration pairs.
 * @example - "aWbH" Duration W, H, Q, E, S
 * @param  {String} [waveform='sine'] - sine, triangle, square, or sawtooth.
 */
export function playPiano(melody, waveform='sine') {
  const actx = new AudioContext();
  // const gain = actx.createGain();

  let runningTime = 0;
  for(let i=0; i < melody.length; i += 2) {
    if (melody[i] === '0') { continue; }
    const freq = 440*1.06**(-105+melody.charCodeAt(i));
    const noteLength = 60 / TEMPO * NOTE_DURATION[melody[i+1]];
    const startTime = runningTime+.3;
    const endTime = startTime+noteLength-.01;
    runningTime = endTime;

    console.group('note');
    console.log('i', i, 'noteLength', noteLength, 'melody', melody[i], 'freq', freq);
    console.log('noteLength', melody[i+1], NOTE_DURATION[melody[i+1]], noteLength);
    console.log('currentTime', actx.currentTime);
    console.log('runningTime', runningTime);
    console.log('startTime', startTime, actx.currentTime + startTime);
    console.log('endTime', endTime, actx.currentTime + endTime);

    const oscillator = new OscillatorNode(actx, {
      type: waveform,
      frequency: freq,
    });

    // oscillator.connect(actx.destination);



    const gain = new GainNode(actx, {
      gain: 0.5,
    });
    gain.gain.setTargetAtTime(0.001, endTime, 0.05);


    oscillator.connect(gain);
    gain.connect(actx.destination);


    oscillator.start(startTime);
    oscillator.stop(endTime);

    console.groupEnd();

    /*
    const note = actx.createOscillator();
      note.start(startTime);
      // note.frequency.setValueAtTime(freq,startTime);
      // note.type = waveform;
      G.gain.setValueAtTime(.5,startTime),
      G.gain.setTargetAtTime(.001,startTime+.1,.05),
      note.stop(startTime+noteLength-.01);
      // connect last, because? MDN says so.
      note.connect(G);
    */

  }

  // These pages say to connect to the destination on the last step.
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API
  // G.connect(actx.destination);
}



// For Easy create/debuggin
window.playPiano = playPiano;
