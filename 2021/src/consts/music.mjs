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
      playPiano('UWVWUW',0.5)
      playPiano('aHbQcQdEdEeEaHfEfEfEgH', 0.25)
    },
    // 1 is a intro music.
    () => {
      const happyRift = 'fQfQgEdQdQ'; // 4.5 beats
      playPiano(`fQfQ${happyRift}`, 0.25, 'sine');
    },
    // 2 is "can't push trash" sound.
    () => {
      playPiano('ZE');
    },
    // 3 is "trash compacting" sound.
    () => {
      playPiano(zipString('WQESQQH', 'ZZaZZZa'))
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
