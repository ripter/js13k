import { drawText } from '../canvas/drawText.mjs';
import { formatNumber } from '../utils/formatNumber.mjs';
import { cycleColorText } from './cycleColorText.mjs';

export function* endGameScene() {
  let genFlashScore;
  // init finished.
  let props = yield;

  // flash forever
  while (true) {
    const { entity, deltaTime } = props;
    const score = formatNumber(entity.totalScore);

    if (!genFlashScore) {
      genFlashScore = cycleColorText(`${score}`, 104, 142, 2);
    }
    genFlashScore.next({deltaTime});

    drawText('Good Job!!', 86, 30, '#fff', 3);
    drawText(`Total Score:`, 8, 142, '#fff', 2);

    // Yield till the next tick.
    props = yield;
  }

  yield;
  return;
}
