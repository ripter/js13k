import { byComponents } from '../entities/byComponents.mjs';
import { byID } from '../entities/byID.mjs';
import { byParentID } from '../entities/byParentID.mjs';
import { getCollisionByKey } from '../utils/getCollisions.mjs';
import { getKey, getDeltaKey } from '../utils/key.mjs';

export function playerSystem(delta) {
  const { downKeys } = byID('input');
  const entitiesToMove = new Set();
  const movableEntities = byComponents(['movable-group']);
  const playerEntities = byComponents(['player']);
  const solidEntities = byComponents(['solid']);
  const noTrashEntities = byComponents(['solid'],['no-trash']);

  //
  // If there are no keys down, or there is no player
  // we can skip the rest of the system.
  if (downKeys.size === 0 || playerEntities.size === 0) {
    return;
  }
  // We only support one player.
  const player = Array.from(playerEntities)[0];

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

  // Get the key for the delta position.
  const playerDeltaKey = getDeltaKey(player);
  // Add the player to the list of entities to move.
  entitiesToMove.add(player);


  // Player can push movable-group entities by pushing on any entity in the group.
  // if any entity in the group would collide when moved, then don't move the group.
  const pushedEntities = getCollisionByKey(playerDeltaKey, getKey, movableEntities);
  if (pushedEntities?.length > 0) {
    // Get all the entities in the group the user is pushing on.
    // If the entity isn't part of a group, then use the entity.
    const { parentID } = pushedEntities[0];
    const groupEntities = parentID ? Array.from(byParentID(parentID).values()) : pushedEntities;

    // Check if any entity in the group will collide with a solid if pushed.
    const collisionEntity = groupEntities.find(groupEntity => {
      const groupKey = getKey(groupEntity, player.deltaX, player.deltaY);
      const solidCollsions = getCollisionByKey(groupKey, getDeltaKey, noTrashEntities)
        .filter(entity => entity.parentID !== parentID);
      return solidCollsions.length > 0;
    });

    // No collision, move everyone in the group.
    if (!collisionEntity) {
      groupEntities.forEach(entity => {
        entity.deltaX = player.deltaX;
        entity.deltaY = player.deltaY;
        entitiesToMove.add(entity);
      });
    }
  }

  //
  // Don't let the player collide with a solid.
  // Clear the delta if the player's delta position would be in the same space as a solid's delta position.
  const solidCollisions = getCollisionByKey(playerDeltaKey, getDeltaKey, solidEntities).filter(entity => entity !== player);
  if (solidCollisions?.length > 0) {
    player.deltaX = 0;
    player.deltaY = 0;
    entitiesToMove.delete(player);
  }

  //
  // Move everyone a single tile by delta.
  entitiesToMove.forEach(entity => {
    entity.x += entity.deltaX * 8;
    entity.y += entity.deltaY * 8;
    // Reset their delta after the move.
    entity.deltaX = 0;
    entity.deltaY = 0;
  });
}
