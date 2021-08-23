import { byID } from '../components/byID.mjs';
import { byParentID } from '../entities/byParentID.mjs';
import { byComponents } from '../entities/byComponents.mjs';
import { getKey, getDeltaKey } from '../utils/key.mjs';
import { getCollisionByKey } from '../utils/getCollisions.mjs';

const downKeys = new Set();

function mapKey(method, evt) {
  switch (evt.code) {
    case 'KeyA':
    case 'ArrowLeft':
      return downKeys[method]('left');
    case 'KeyD':
    case 'ArrowRight':
      return downKeys[method]('right');
    case 'KeyS':
    case 'ArrowDown':
      return downKeys[method]('down');
    case 'KeyW':
    case 'ArrowUp':
      return downKeys[method]('up');
  }
}

window.addEventListener('keydown', mapKey.bind(null, 'add'));
window.addEventListener('keyup', mapKey.bind(null, 'delete'));



const DELAY_TIME = 0.10;
let delay = 0;
export function inputSystem(delta) {
  const player = byID('player');
  const entitiesToMove = new Set();

  // create a delay between responding to button presses.
  delay -= delta;
  if (delay >= 0) {
    return;
  }

  const solidEntities = byComponents(['solid']);
  const movableEntities = byComponents(['movable-group']);

  //
  // If a key is down, rest the input delay.
  if (downKeys.size > 0) {
    delay = DELAY_TIME;
    entitiesToMove.add(player);
  }
  //
  // Set the delta direction the player wants to move.
  if (downKeys.has('left')) {
    player.deltaX = -1;
  }
  else if (downKeys.has('right')) {
    player.deltaX = 1;
  }
  else {
    player.deltaX = 0;
  }
  if (downKeys.has('up')) {
    player.deltaY = -1;
  }
  else if (downKeys.has('down')) {
    player.deltaY = 1;
  }
  else {
    player.deltaY = 0;
  }


  // const playerKey = getDeltaKey(player);
  // Will moving cause the player to collide with a movable-group?
  // let collisionEntities = Array.from(movableEntities.values()).find(entity => getKey(entity) === getDeltaKey(player));
  const playerDeltaKey = getDeltaKey(player);
  // Player can push movable-group entities.
  let collisionEntities = getCollisionByKey(playerDeltaKey, getKey, movableEntities); //.filter(entity => entity !== player);
  collisionEntities.forEach(movableEntity => {
    const movableDeltaKey = getKey(movableEntity, player.deltaX, player.deltaY);
    // check, if we moved this entity by delta, would it collide with a solid?
    const solidCollisions = getCollisionByKey(movableDeltaKey, getDeltaKey, solidEntities).filter(entity => entity !== player);
    if (solidCollisions?.length > 0) {
      console.log('solidCollisions', solidCollisions);
    }
  });

  
  // Don't let the player collide with a solid.
  // Clear the delta if the player's delta position would be in the same space as a solid's delta position.
  collisionEntities = getCollisionByKey(playerDeltaKey, getDeltaKey, solidEntities).filter(entity => entity !== player);
  if (collisionEntities?.length > 0) {
    player.deltaX = 0;
    player.deltaY = 0;
  }



  /*
  if (movableEntities.has(playerKey)) {
    // can the player move all the entities in the group?
    const movableEntity = movableEntities.get(playerKey);
    const groupedEntities = byParentID(movableEntity.parentID);
    const hasCollision = Array.from(groupedEntities.entries()).find(groupedEntity => solidEntities.has(getKey(groupedEntity, player.deltaX, player.deltaY)));

    // if moving a grouped entity by player delta will result in a collision, don't move anyone.
    if (hasCollision) {
      player.deltaX = 0;
      player.deltaY = 0;
      entitiesToMove.delte(player);
    }
    // If it doesn't result in collision, then give all the grouped entities the player's delta.
    else {
      groupedEntities.forEach(groupedEntity => {
        groupedEntity.deltaX = player.deltaX;
        groupedEntity.deltaY = player.deltaY;
        entitiesToMove.add(groupedEntity);
      });
    }
  }
  */

  // Move everyone a single tile by delta.
  entitiesToMove.forEach(entity => {
    entity.x += entity.deltaX * 8;
    entity.y += entity.deltaY * 8;
  });
}
