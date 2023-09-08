import { dispatch } from '../dispatch.mjs';

export async function dispatchStartGame() {
  await dispatch(async (state) => {
    // Get 6 random card indexes to fill the pond
    const uniqueIndexes = new Set();
    while (uniqueIndexes.size < 6) {
      const randomIndex = Math.floor(Math.random() * state.deck.length);
      uniqueIndexes.add(randomIndex);
    }

    state.pond = Array.from(uniqueIndexes);
    state.activeDialogIdx = -1;
  });
}