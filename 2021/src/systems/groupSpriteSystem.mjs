import { byComponents } from '../components/byComponents.mjs';
import { byIDs } from '../components/byIDs.mjs';

/**
 * Updates a group of sprites as one.
*/
export function groupSpriteSystem(delta) {
  const entities = byComponents(['sprite_group']);

  entities.forEach(entity => {
    const sprites = byIDs(entity.sprites);
    sprites.forEach(sprite => {
      sprite.x = entity.x + sprite.offsetX;
      sprite.y = entity.y + sprite.offsetY;
    });
  });
}
