import { loadJSON } from '../loadJson.mjs';

export async function actionLoadTribe(state, tribeURL) {
  const tribeData = await loadJSON(`tribes/${tribeURL}`);

  // TODO: Pick first Card.
  // TODO: Roll Dice.
  // TODO: Load oppoinents
  return tribeData;
}