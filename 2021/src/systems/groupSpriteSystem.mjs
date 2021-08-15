import { byComponents } from '../components/byComponents.mjs';
import { byIDs } from '../components/byIDs.mjs';

/**
 * Updates a group of sprites as one.
*/
export function groupSpriteSystem(delta) {
  const entities = byComponents(['sprite_group']);

  entities.forEach(group => {
    const sprites = byIDs(group.sprites);
    sprites.forEach(sprite => {
      sprite.x = group.x + sprite.offsetX;
      sprite.y = group.y + sprite.offsetY;
      sprite.deltaX = group.deltaX;
      sprite.deltaY = group.deltaY;
    });
  });
}
