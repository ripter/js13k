import { byComponents } from '../components/byComponents.mjs';
import { byIDs } from '../components/byIDs.mjs';
import { byID } from '../components/byID.mjs';
import { willCollide, collisionAABB } from '../utils/collision.mjs';


export function physicsSystem(delta) {
  const playerEntity = byID('player');
  const pushableGroupEntities = byComponents(['pushable', 'sprite_group']);
  const solidEntities = byComponents(['solid']);
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

    // is it touching another pushable group?
    // pushableGroupEntities.forEach(groupEntity2 => {
    //   const spriteEntities2 = byIDs(groupEntity2.sprites);
    //   let collidingID = groupEntity.sprites.find(spriteID => groupEntity2.sprites.find(spriteID2 => {
    //     if (spriteID === spriteID2) { return false; }
    //     return willCollide(spriteEntities.get(spriteID), spriteEntities2.get(spriteID2));
    //   }));
    //   if (collidingID) {
    //     groupEntity.deltaX = 0;
    //     groupEntity.deltaY = 0;
    //   }
    // });

    // Is it on a conveyor?
    conveyorEntities.forEach(conveyorEntity => {
      let collidingID = groupEntity.sprites.find(spriteID => collisionAABB(conveyorEntity, spriteEntities.get(spriteID)));
      if (collidingID) {
        groupEntity.deltaX = conveyorEntity.beltDirection.x;
        groupEntity.deltaY = conveyorEntity.beltDirection.y;
      }
    });

    // Has it hit a solid?
    solidEntities.forEach(solidEntity => {
      let collidingID = groupEntity.sprites.find(spriteID => willCollide(spriteEntities.get(spriteID), solidEntity))
      if (collidingID) {
        groupEntity.deltaX = 0;
        groupEntity.deltaY = 0;
      }
    });

    // Have we collided with another pushable group?
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
