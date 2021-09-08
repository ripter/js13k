import { COLORS } from '../consts/fontColors.mjs';
import { drawText } from '../canvas/drawText.mjs';

export function* cycleColorText(msg, x, y, scale = 1, speed = 1) {
  let delay = speed;
  let colorIndex = 0;

  while (true) {
    const { deltaTime } = yield;
    drawText(msg, x, y, COLORS[colorIndex], scale);

    delay -= deltaTime;
    if (delay <= 0) {
      colorIndex = (colorIndex+1) % COLORS.length;
      delay = speed;
    }
  }
}
