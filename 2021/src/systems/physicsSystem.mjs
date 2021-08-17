import { byComponents } from '../components/byComponents.mjs';
import { byID } from '../components/byID.mjs';
import { createEntityTable } from '../utils/createEntityTable.mjs';
import { getPosKey } from '../utils/getPosKey.mjs';
import { getTilePos } from '../utils/getTilePos.mjs';
import { inGroup } from '../entities/inGroup.mjs';
import { getKey } from '../utils/key.mjs';
import { createCollisionMap } from '../utils/createCollisionMap.mjs';


export function physicsSystem(delta) {
  const playerEntity = byID('player');
  const movableMap = createEntityTable(byComponents(['movable']));
  const pushableMap = createEntityTable(byComponents(['pushable']));
  const pusherMap =  createEntityTable(byComponents(['pusher']));
  const solidMap = createEntityTable(byComponents(['solid']));

  // The player is pushing in the direction they are moving.
  playerEntity.pushX = playerEntity.deltaX;
  playerEntity.pushY = playerEntity.deltaY;


  // collision check: Pushables colliding with Pushers
  // when a pusher is colliding with a pushable, it will apply it's push value as delta value.
  // Conveyor's and the Player use this to push around groups of trash blocks.
  createCollisionMap(pushableMap, pusherMap).forEach(collisionEntities => {
    const entries = Array.from(collisionEntities);
    const pusherEntity = entries.find(entity => entity.components.has('pusher'));
    const pushableEntity = entries.find(entity => entity.components.has('pushable'));
    // Move all the pushable entities.
    inGroup(pushableEntity).forEach(groupedEntity => {
      groupedEntity.deltaX = pusherEntity.pushX;
      groupedEntity.deltaY = pusherEntity.pushY;
    });
  });

  // colision check: Movables colliding with Solids
  // When a mover is trying to move, don't let it move though a solid.
  // We do this by clearing the mover delta values. This changes their position on the collision map.
  // Keep checking until there are no more collisions.
  let solidCollisionMap = createCollisionMap(solidMap, movableMap);
  while (solidCollisionMap.size > 0) {
    solidCollisionMap.forEach(cancelDeltaOnMovable);
    solidCollisionMap = createCollisionMap(solidMap, movableMap);
  }

  // Update the position of movable entities by applying delta.
  movableMap.forEach(entity => {
    // Apply Deltas, tiles are 8x8 pixels.
    entity.x += entity.deltaX*8;
    entity.y += entity.deltaY*8;
    // clear the deltas
    entity.deltaX = 0;
    entity.deltaY = 0;
  });
}

/**
 * Cancels the delta on the movable collision entities.
*/
function cancelDeltaOnMovable(collisionEntities) {
  Array.from(collisionEntities)
    .filter(entity => entity.components.has('movable'))
    .forEach(entity => {
      inGroup(entity).forEach(groupedEntity => {
        groupedEntity.deltaX = 0;
        groupedEntity.deltaY = 0;
      });
    });
}
