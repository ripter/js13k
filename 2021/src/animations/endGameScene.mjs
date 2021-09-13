import { addTrashBlock } from '../entities/addTrashBlock.mjs';
import { byComponents } from '../entities/byComponents.mjs';
import { byID } from '../entities/byID.mjs'
import { createRandomTrashBlocks } from '../utils/createRandomTrashBlocks.mjs';
import { cycleColorText } from './cycleColorText.mjs';
import { deleteWithComponent } from '../entities/deleteWithComponent.mjs';
import { drawText } from '../canvas/drawText.mjs';
import { formatNumber } from '../utils/formatNumber.mjs';
import { startNewLevel } from './startNewLevel.mjs';

export function* endGameScene() {
  let scoreEntities;
  const hudEntity = byID('hud');
  hudEntity.components.delete('display-score');
  // Setup the player to push around trash.
  const playerEntity = byID('player');
  window.INPUT_DELAY = 0.1;
  playerEntity.components.delete('player-disabled');
  playerEntity.components.add('player');
  // Delete all the old score blocks.
  deleteWithComponent('score');


  // init finished.
  let props = yield;

  const score = formatNumber(props.entity.totalScore);
  const genFlashScore = cycleColorText(`${score}`, 104, 142, 2, 0.5);
  const genFlashLevel = cycleColorText(`Level ${window.level}`, 152, 54, 2, 0.5);

  // Create a block for the user to compress
  addTrashBlock(20, 9, createRandomTrashBlocks());
  do {
    const { entity, deltaTime } = props;
    // Draw the score flashing colors!
    genFlashScore.next({deltaTime});
    genFlashLevel.next({deltaTime});

    drawText(`Total Score:`, 8, 142, '#fff', 2);

    drawText('Great Job!!', 86, 30, '#fff', 3);
    drawText(`You beat`, 118, 54, '#fff', 1);

    drawText('Can you clear the next SPACE?', 86, 96, '#fff', 1);
    drawText(`Compress the trash to try level ${window.level+1}`, 86, 104, '#fff', 1);

    // Yield till the next tick.
    props = yield;
    scoreEntities = byComponents(['score']);
  } while (scoreEntities.size === 0);

  // Start a new Game.
  window.level += 1;
  hudEntity.animate = startNewLevel();


  yield;
  return;
}
