import { addTrashBlock } from '../entities/addTrashBlock.mjs';
import { byComponents } from '../entities/byComponents.mjs';
import { byID } from '../entities/byID.mjs';
import { byParentID } from '../entities/byParentID.mjs';
import { createRandomTrashBlocks } from '../utils/createRandomTrashBlocks.mjs';
import { endGameScene } from './endGameScene.mjs';
import { getCollisionByKey } from '../utils/getCollisions.mjs';
import { getKey } from '../utils/key.mjs';

const BLOCKS_TO_CREATE = 1;
export function* startNewLevel() {
  // let the player move faster with a lower input delay
  window.INPUT_DELAY = 0.1;

  // Enable the player.
  const playerEntity = byID('player');
  playerEntity.components.delete('player-disabled');
  playerEntity.components.add('player');

  // Reset the score.
  const hudEntity = byID('hud');
  hudEntity.totalScore = 0;
  hudEntity.components.add('display-score');

  // get the entities that collide with a new trash block.
  const noTrashEntities = byComponents(['solid'],['no-trash']);
  // Create the trash blocks for the level.
  for (let i=0; i < BLOCKS_TO_CREATE; i++) {
    // Create a random trash block.
    let trashData = createRandomTrashBlocks();

    // Find a position that doesn't have the trash colliding
    let tileX, tileY, doesCollide;
    do {
      tileX = (0|(Math.random() * window.c.width)/8)+1;
      tileY = (0|(Math.random() * window.c.height)/8)+1;
      doesCollide = trashData.find(block => {
        let collisionKey = getKey({x: tileX*8, y: tileY*8}, block[2], block[3]);
        let collisions = getCollisionByKey(collisionKey, getKey, noTrashEntities);
        const blockX = tileX + block[2];
        const blockY = tileY + block[3];
        // if there is a collision, or if the tile would be on the edge of off screen.
        // then return false so we can pick a new position.
        return collisions.length > 0
          // Check if the block would be on the edge
          || blockX >= 31
          || blockY >= 19;

      });
    } while (doesCollide);

    // Add the block.
    const parentID = addTrashBlock(tileX, tileY, trashData);
    // Update the set since it it cached each tick.
    byParentID(parentID).forEach(entity => {
      noTrashEntities.add(entity)
    });
  }

  // init finished.
  yield;


  // Loop until the user compacts all the trash.
  let trashEntities;
  do {
    trashEntities = byComponents(['trash-block']);
    yield;
  } while (trashEntities.size > 0);

  //
  // Switch to end game
  hudEntity.animate = endGameScene(),
  yield;

  console.log('END startNewLevel');
}
