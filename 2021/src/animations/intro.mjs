import { drawText } from '../canvas/drawText.mjs';
import { byID } from '../entities/byID.mjs'
import { addTrashBlock } from '../entities/addTrashBlock.mjs';
import { createRandomTrashBlocks } from '../utils/createRandomTrashBlocks.mjs';


const COLORS = [
  '#FFF',
  '#55F',
  '#0A0',
  '#A00',
  '#F5F',
];
export function* introAnimation(args) {
  const inputEntity = byID('input');
  const playerEntity = byID('player');
  const animateTitle = colorTitle();

  // Show Title unill a button is pressed.
  while (inputEntity.downKeys.size === 0) {
    let { deltaTime } = yield;
    // Animated title
    animateTitle.next({deltaTime});
  }

  yield; // pause for a tick.
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('<- This is you.', playerEntity.x + 10, playerEntity.y+2, COLORS[0], 1);
  }

  yield; // pause for a tick.
  addTrashBlock(17, 9, createRandomTrashBlocks());
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('This is trash ->', playerEntity.x + 10, playerEntity.y+2, COLORS[0], 1);
  }

  return;
}


/**
 * Animates a colored Title
 * @return {Generator}
 */
function* colorTitle() {
  const DELAY_TIME = 1;
  let delay = DELAY_TIME;
  let colorIndex = 0;

  while (true) {
    const { deltaTime } = yield;
    drawText('JS13kGame 2021 - "SPACE"', 8, 8, COLORS[colorIndex], 2);

    delay -= deltaTime;
    if (delay <= 0) {
      colorIndex = (colorIndex+1) % COLORS.length;
      delay = DELAY_TIME;
    }
  }
}
