import { playPiano } from '../utils/alphabetPiano.mjs';

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
    },
    // 1 is a intro music.
    () => {
      playPiano('aWaHaHaQaQaQaQ', 'sine');
      // playPiano('aWbWaHbHaQbQ', 'sine');
      // playPiano('Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0', 0.15, 'sine')
      // playPiano('hihi0why00hihi0why0querty0querty0hi0hi')
    },
    // 1 is main compactor
    () => {

    },
];
