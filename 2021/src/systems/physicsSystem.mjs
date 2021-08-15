import { byComponents } from '../components/byComponents.mjs';
import { byIDs } from '../components/byIDs.mjs';
import { byID } from '../components/byID.mjs';
// import { byParentID } from '../components/byParentID.mjs';
import { willCollide, collisionAABB } from '../utils/collision.mjs';
import { createEntityTable } from '../utils/createEntityTable.mjs';
import { getTilePos } from '../utils/getTilePos.mjs';
import { inGroup } from '../entities/inGroup.mjs';


export function physicsSystem(delta) {
  const playerEntity = byID('player');
  const playerPos = getTilePos(playerEntity);


  const pushableGroupEntities = byComponents(['pushable', 'sprite_group']);

  const conveyorEntities = byComponents(['conveyor']);
  const conveyorTable =  createEntityTable(conveyorEntities);

  // const solidEntities = byComponents(['solid']);
  // const solidTable =  createEntityTable(solidEntities);

  // Create a map of all solid entities.
  const solidMap = createEntityTable(byComponents(['solid']));
  // Create a map of all the pushable entities.
  const pushableMap = createEntityTable(byComponents(['pushable']));

  // Check if player is pushing
  if (pushableMap.has(playerPos.nextKey)) {
    // use the players delta
    inGroup(pushableMap.get(playerPos.nextKey)).forEach(groupedEntity => {
      groupedEntity.deltaX = playerEntity.deltaX;
      groupedEntity.deltaY = playerEntity.deltaY;
    });
  }

  // Check if a pushable would move into a solid block.
  pushableMap.forEach(pushableEntity => {
    const pushablePos = getTilePos(pushableEntity);
    const collidedEntity = pushableMap.get(pushablePos.nextKey);
    // Skip if there is no collision.
    if (!collidedEntity) { return; }
    // skip entities that share a parent
    if (pushableEntity.parentID === collidedEntity.parentID) { return; }

    // don't move anyone in the group.
    inGroup(pushableEntity).forEach(groupedEntity => {
      groupedEntity.deltaX = 0;
      groupedEntity.deltaY = 0;
    });
  });


  // const pushableCollidedWithNextPlayer = pushableMap.get(playerPos.nextKey);
  // if (pushableCollidedWithNextPlayer) {
  //   // let entitiesToUpdate;
  //   // // if it has a parent, update everyone with the parent.
  //   // if (pushableCollidedWithNextPlayer.parentID) {
  //   //   entitiesToUpdate = byParentID(pushableCollidedWithNextPlayer.parentID);
  //   // } else {
  //   //   // no parent, just uptate this entity.
  //   //   entitiesToUpdate = [pushableCollidedWithNextPlayer];
  //   // }
  //
  //   // add delta from the palyer.
  //   inGroup(pushableCollidedWithNextPlayer).forEach(pushable => {
  //     pushable.deltaX = playerEntity.deltaX;
  //     pushable.deltaY = playerEntity.deltaY;
  //   });
  // }


  // If


  // check each pushable sprite group for collision.
  // transfer momentum
  /*
  pushableGroupEntities.forEach(groupEntity => {
    const spriteEntities = byIDs(groupEntity.sprites);

    // // Will the player collide with one of the sprites?
    // let touchingID = groupEntity.sprites.find(spriteID => willCollide(playerEntity, spriteEntities.get(spriteID)));
    // if (touchingID) {
    //   // Push the group in the same direction the player is moving.
    //   groupEntity.deltaX = playerEntity.deltaX;
    //   groupEntity.deltaY = playerEntity.deltaY;
    // }

    // Is it on a conveyor?
    // conveyorEntities.forEach(conveyorEntity => {
    //   let collidingID = groupEntity.sprites.find(spriteID => collisionAABB(conveyorEntity, spriteEntities.get(spriteID)));
    //   if (collidingID) {
    //     groupEntity.deltaX = conveyorEntity.beltDirection.x;
    //     groupEntity.deltaY = conveyorEntity.beltDirection.y;
    //   }
    // });

    // We need to check each sprite in our group for solid collisions.
    spriteEntities.forEach(sprite => {
      const tileX = 0|sprite.x/8;
      const tileY = 0|sprite.y/8;
      // Apply group delta on the sprite to get the tile we will land on next.
      const nextTileX = 0|(sprite.x/8) + groupEntity.deltaX;
      const nextTileY = 0|(sprite.y/8) + groupEntity.deltaY;
      // try to get the solidEntity on the tile we are going.
      const solidEntity = solidTable.get(`${nextTileX},${nextTileY}`);
      const conveyorEntity = conveyorTable.get(`${tileX},${tileY}`);

      // if the sprite is on a conveyor, move the group.
      if (conveyorEntity) {
        // groupEntity.deltaX = 1;
        groupEntity.deltaX = conveyorEntity.beltDirection.x;
        groupEntity.deltaY = conveyorEntity.beltDirection.y;
      }

      // if there isn't anything solid there, move on.
      if (!solidEntity) { return; }
      // if the solid tile is one one of ours, move on.
      if (solidEntity.parentID === groupEntity.id) { return; }

      // it collided, kill the delta.
      groupEntity.deltaX = 0;
      groupEntity.deltaY = 0;
      // sprite.deltaX = groupEntity.deltaX;
      // sprite.deltaY = groupEntity.deltaY;
    });

  });
  */


  const movableEntities = byComponents(['movable']);
  // Update the position of movable entities
  movableEntities.forEach(entity => {
    // const pos = getTilePos(entity);
    // // const solidCollidedWithDelta = solidMap.get(pos.nextKey);
    // const solidCollide = solidMap.get(pos.nextKey);
    //
    // // if we collide, the entire group is colliding.
    // if (solidCollide) {
    //   inGroup(entity).forEach(groupedEntity => {
    //     groupedEntity.deltaX = 0;
    //     groupedEntity.deltaY = 0;
    //   })
    // }

    // // Only apply delta if it won't cause us to run into a solid tile.
    // // ignore solid blocks in our group.
    // if (!solidCollide
    //   || solidCollide.parentID === entity.parentID
    //   || !solidMap.has(pos.nextKey)) {
      // // Apply Deltas
      // entity.x += entity.deltaX*8;
      // entity.y += entity.deltaY*8;
    // }

    // Apply Deltas
    entity.x += entity.deltaX*8;
    entity.y += entity.deltaY*8;
    // clear the deltas
    entity.deltaX = 0;
    entity.deltaY = 0;
  });
}
