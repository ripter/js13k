import { addTrashBlock } from '../entities/addTrashBlock.mjs';
import { byComponents } from '../entities/byComponents.mjs';
import { byID } from '../entities/byID.mjs'
import { COLORS } from '../consts/fontColors.mjs';
import { createRandomTrashBlocks } from '../utils/createRandomTrashBlocks.mjs';
import { drawText } from '../canvas/drawText.mjs';
import { startNewLevel } from './startNewLevel.mjs';
import { cycleColorText } from './cycleColorText.mjs';


export function* introAnimation(args) {
  const inputEntity = byID('input');
  const playerEntity = byID('player');
  const hudEntity = byID('hud');
  const genHeader = cycleColorText('JS13kGame 2021 - "SPACE"', 8, 8, 2);

  // Show Title unill a button is pressed.
  while (inputEntity.downKeys.size === 0) {
    let { deltaTime } = yield;
    // Animated title
    genHeader.next({deltaTime});
  }

  // Point out the player
  yield; // pause for a tick.
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('<- This is you.', playerEntity.x + 10, playerEntity.y+2, COLORS[0], 1);
  }

  // Point out trash
  yield; // pause for a tick.
  addTrashBlock(18, 9, createRandomTrashBlocks());
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('This is trash. ->', playerEntity.x + 10, playerEntity.y+2, COLORS[0], 1);
  }

  // Point out the compactor
  yield;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('This is the Trash Compactor.', 16, 32, COLORS[0], 1);
    drawText('VVVV', 16, 40, COLORS[0], 1);
  }

  // Point out the button.
  yield;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('<- This is the compact button.', 56, 108, COLORS[0], 1);
  }

  // How to play
  yield;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('Push trash in the Compactor.', 80, 112, COLORS[0], 1);
    drawText('Push the button to compress it.', 80, 120, COLORS[0], 1);
  }

  // Wait until the player compresses the block.
  yield;
  playerEntity.components.delete('player-disabled');
  playerEntity.components.add('player');
  window.INPUT_DELAY = 0.1;
  let scoreEntities;
  do {
    scoreEntities = byComponents(['score']);
    yield;
  } while (scoreEntities.size === 0);


  window.INPUT_DELAY = 0.5;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('The more trash you compress, ', 80, 112, COLORS[0], 1);
    drawText('the higher the score.', 80, 120, COLORS[0], 1);
  }

  yield;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('Clear the SPACE', 80, 112, COLORS[0], 1);
    drawText('and get the highest score!', 80, 120, COLORS[0], 1);
  }

  // Start a new Game.
  window.level = 1;
  hudEntity.animate = startNewLevel();
  // We need to yield after setting a new animation so that this animation
  // won't terminate and remove the component.
  yield;
  // return ends the Generator.
  return;
}
