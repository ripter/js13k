import { playPiano } from '../utils/alphabetPiano.mjs';
import { zipString } from '../utils/zipString.mjs';

export const TEMPO = 120;

export const NOTE_DURATION = {
  W: 4, // whole note
  H: 2, // half note
  Q: 1, // quater note
  E: 0.5,
  S: 0.25,
};

export const MUSIC = [
    // 0 is idle song.
    () => {
      // playPiano('a<a>a@@b<b>a<a>a@@b<b>a<a>a@@b<b>', 0.3, 'triangle');
      // playPiano('a<a>a@@b<b>a<a>a@@b<b>a<a>a@@b<b>', 0.3, 'sine');
      playPiano('UWVWUW',0.5)
      playPiano('aHbQcQdEdEeEaHfEfEfEgH', 0.25)
    },
    // 1 is a intro music.
    () => {
      // const baseLine = 'RQRQRQRQTH0QTH'; // 9 beats
      const happyRift = 'fQfQgEdQdQ'; // 4.5 beats
      // playPiano(baseLine, 0.5, 'sine');
      playPiano(`fQfQ${happyRift}`, 0.25, 'sine');
      // playPiano(`fQfQ${happyRift}fQfQ`, 0.25, 'sine');
      // playPiano('aWbWaHbHaQbQ', 'sine');
      // playPiano('Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0', 0.15, 'sine')
      // playPiano('hihi0why00hihi0why0querty0querty0hi0hi')
    },
    // 2 is "can't push trash" sound.
    () => {
      playPiano('ZE');
    },
];

export const MELODY = [
  // 0
  'aaabccdde',
];
window.MELODY = MELODY;

export const BEATS = [
  // 0 is a build up
  'EEEHQQSQH',
];
window.BEATS = BEATS;
