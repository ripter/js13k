import { addTrashBlock } from '../entities/addTrashBlock.mjs';
import { byComponents } from '../entities/byComponents.mjs';
import { byID } from '../entities/byID.mjs'
import { createRandomTrashBlocks } from '../utils/createRandomTrashBlocks.mjs';
import { cycleColorText } from './cycleColorText.mjs';
import { deleteWithComponent } from '../entities/deleteWithComponent.mjs';
import { drawText } from '../canvas/drawText.mjs';
import { formatNumber } from '../utils/formatNumber.mjs';

export function* endGameScene() {
  let genFlashScore, scoreEntities;
  // Setup the player to push around trash.
  const playerEntity = byID('player');
  window.INPUT_DELAY = 0.1;
  playerEntity.components.delete('player-disabled');
  playerEntity.components.add('player');
  // Delete all the old score blocks.
  deleteWithComponent('score');
  // init finished.
  let props = yield;


  // Create a block for the user to compress
  addTrashBlock(18, 9, createRandomTrashBlocks());
  do {
    const { entity, deltaTime } = props;
    scoreEntities = byComponents(['score']);
    const score = formatNumber(entity.totalScore);

    if (!genFlashScore) {
      genFlashScore = cycleColorText(`${score}`, 104, 142, 2, 0.5);
    }
    // Draw the score flashing colors!
    drawText(`Total Score:`, 8, 142, '#fff', 2);
    genFlashScore.next({deltaTime});

    drawText('Good Job!!', 86, 30, '#fff', 3);
    drawText('To Continue,', 86, 54, '#fff', 1);
    drawText('Compress that trash!', 86, 62, '#fff', 1);

    // Yield till the next tick.
    props = yield;
  } while (scoreEntities.size === 0);

  console.log('Load Next Level!');

  yield;
  return;
}
