import { loadJSON } from '../loadJson.mjs';

export async function actionLoadTribe(state, tribeURL) {
  const tribeData = await loadJSON(`tribes/${tribeURL}`);
  console.log('tribeData', tribeData);
  return {
    ...tribeData,
  };
}