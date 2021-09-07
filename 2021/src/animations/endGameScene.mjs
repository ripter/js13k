import { drawText } from '../canvas/drawText.mjs';

export function* endGameScene(args) {
  console.log('endGameScene', args);
  // init finished.
  let props = yield;
  console.log('props', props);

  while (true) {
    drawText('Good Job!!', 30, 30, '#fff', 3);
    props = yield;
  }  

  yield;
  return;
}
