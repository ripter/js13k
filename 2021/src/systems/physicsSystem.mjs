import { byComponents } from '../components/byComponents.mjs';
import { byIDs } from '../components/byIDs.mjs';
import { byID } from '../components/byID.mjs';
import { willCollide, collisionAABB } from '../utils/isTouching.mjs';


export function physicsSystem(delta) {
  const playerEntity = byID('player');
  const pushableGroupEntities = byComponents(['pushable', 'sprite_group']);
  const conveyorEntities = byComponents(['conveyor']);
  const movableEntities = byComponents(['movable']);

  // check each pushable sprite group for collision.
  // transfer momentum
  pushableGroupEntities.forEach(groupEntity => {
    const spriteEntities = byIDs(groupEntity.sprites);

    // Will the player collide with one of the sprites?
    let touchingID = groupEntity.sprites.find(spriteID => willCollide(playerEntity, spriteEntities.get(spriteID)));
    if (touchingID) {
      // Push the group in the same direction the player is moving.
      groupEntity.deltaX = playerEntity.deltaX;
      groupEntity.deltaY = playerEntity.deltaY;
    }

    // Is it on a conveyor?
    conveyorEntities.forEach(conveyorEntity => {
      let collidingID = groupEntity.sprites.find(spriteID => collisionAABB(conveyorEntity, spriteEntities.get(spriteID)));
      if (collidingID) {
        groupEntity.deltaX += conveyorEntity.beltDirection.x;
        groupEntity.deltaY += conveyorEntity.beltDirection.y;
      }
    });
  });

  // Update the position of movable entities
  movableEntities.forEach(entity => {
    // Apply Deltas
    entity.x += entity.deltaX;
    entity.y += entity.deltaY;

    // clear the deltas
    entity.deltaX = 0;
    entity.deltaY = 0;
  });
}
