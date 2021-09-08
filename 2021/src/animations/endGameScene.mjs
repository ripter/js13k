import { drawText } from '../canvas/drawText.mjs';
import { formatNumber } from '../utils/formatNumber.mjs';

export function* endGameScene(args) {
  console.log('endGameScene', args);
  // init finished.
  let props = yield;
  console.log('props', props);

  while (true) {
    const { entity } = props;
    const score = formatNumber(entity.totalScore);
    drawText('Good Job!!', 86, 30, '#fff', 3);
    drawText(`Total Score: ${score}`, 8, 142, '#fff', 2);

    // Yield till the next tick.
    props = yield;
  }

  yield;
  return;
}
