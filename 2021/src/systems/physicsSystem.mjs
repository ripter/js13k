import { byComponents } from '../components/byComponents.mjs';
import { byID } from '../components/byID.mjs';
import { createEntityTable } from '../utils/createEntityTable.mjs';
import { getPosKey } from '../utils/getPosKey.mjs';
import { getTilePos } from '../utils/getTilePos.mjs';
import { inGroup } from '../entities/inGroup.mjs';


export function physicsSystem(delta) {
  const playerEntity = byID('player');
  const playerPos = getTilePos(playerEntity);
  // Create a map of all the pusher tiles.
  const pusherMap =  createEntityTable(byComponents(['pusher']));
  // Create a map of all solid entities.
  const solidMap = createEntityTable(byComponents(['solid']));
  // Create a map of all the pushable entities.
  const pushableMap = createEntityTable(byComponents(['pushable']));

  // The player is pushing in the direction they are moving.
  playerEntity.pushX = playerEntity.deltaX;
  playerEntity.pushY = playerEntity.deltaY;
  // Add the player to the PushMap it their next position since the pushers work by colliding
  pusherMap.set(playerPos.nextKey, playerEntity);



  // Pushables can't move past solids
  pushableMap.forEach(pushableEntity => {
    let [ pushX, pushY ] = [0, 0];
    let pos;
    const pushablePos = getTilePos(pushableEntity);

    // Is the pushable colliding with a pusher?
    const pusherEntity = pusherMap.get(pushablePos.key);
    if (pusherEntity) {
      pushX = pusherEntity.pushX;
      pushY = pusherEntity.pushY;
    }

    // if the push would push us into a solid block, cancel it.
    // ignore solid blocks in our own group.
    pos = getPosKey(pushableEntity, pushX, pushY);
    const solidEntity = solidMap.get(pos.deltaKey);
    if (solidEntity && solidEntity.parentID !== pushableEntity.parentID) {
      pushX = 0;
      pushY = 0;
    }

    // bail if we don't need to update the delta.
    if (pushX === 0 && pushY === 0) {
      return;
    }

    // Move all the sprites in the group by push delta
    inGroup(pushableEntity).forEach(groupedEntity => {
      groupedEntity.deltaX = pushX;
      groupedEntity.deltaY = pushY;
    });
  });


  const movableEntities = byComponents(['movable']);
  // Update the position of movable entities
  movableEntities.forEach(entity => {
    // Apply Deltas
    entity.x += entity.deltaX*8;
    entity.y += entity.deltaY*8;

    if (isNaN(entity.x)) {
      debugger;
    }
    // clear the deltas
    entity.deltaX = 0;
    entity.deltaY = 0;
  });
}
