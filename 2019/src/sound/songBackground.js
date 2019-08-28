
// Generator function, returns an iterator of notes in the song.
export function* songBackground() {
  let index = 0;
  while(true) {
    yield SONG[index];
    index += 1;

    if (index >= SONG.length) {
      index = 0;
    }
  }
}

const SONG = [
  ['C5', 0.5], ['D5', 0.5], ['C5', 0.5],
  ['', 0.5 * 2],
  ['D5', 0.5], ['E5', 0.5], ['D5', 0.5],
  ['C5', 0.25], ['D5', 0.25], ['C5', 0.25],
  ['', 0.5 * 2],
];
