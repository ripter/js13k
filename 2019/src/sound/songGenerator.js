
// Generator function, returns an iterator of notes in the song.
export function* songGenerator(song, repeat = false) {
  let index = 0;
  let shouldContinue = true;

  while(shouldContinue) {
    yield song[index];
    index += 1;

    if (index >= song.length) {
      index = 0;
      if (!repeat) {
        shouldContinue = false;
      }
    }
  }
}
