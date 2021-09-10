import { playPiano } from '../utils/alphabetPiano.mjs';

export const MUSIC = [
    // 0 is idle song.
    () => {
      playPiano('a<a>a@@b<b>a<a>a@@b<b>a<a>a@@b<b>', 0.3, 'triangle');
      playPiano('a<a>a@@b<b>a<a>a@@b<b>a<a>a@@b<b>', 0.3, 'sine');
    },
    // 1 is a jazzy tune.
    () => {
      playPiano('Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0Z0ZaaZ0Z0W0W0', 0.15, 'sine')
      playPiano('hihi0why00hihi0why0querty0querty0hi0hi')
    },
    // 1 is main compactor
    ['ZY0KH0YX0KH0WX', 0.3, 'sine'],
    [
      '@@@0AAA0BBB0CCC',
      0.3, 'triangle'
    ],
];
