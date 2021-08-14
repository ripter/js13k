import { byComponents } from '../components/byComponents.mjs';
import { byIDs } from '../components/byIDs.mjs';
import { byID } from '../components/byID.mjs';
import { willCollide } from '../utils/isTouching.mjs';


export function physicsSystem(delta) {
  const playerEntity = byID('player');
  const pushableGroupEntities = byComponents(['pushable', 'sprite_group']);
  const movableEntities = byComponents(['movable']);

  // check each pushable sprite group for collision.
  // transfer momentum
  pushableGroupEntities.forEach(groupEntity => {
    const spriteEntities = byIDs(groupEntity.sprites);

    // Will the player collide with one of the sprites?
    let touchingID = groupEntity.sprites.find(spriteID => willCollide(playerEntity, spriteEntities.get(spriteID)));
    if (touchingID) {
      groupEntity.deltaX = playerEntity.deltaX;
      groupEntity.deltaY = playerEntity.deltaY;
    }
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
