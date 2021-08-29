import { genFrameAnimation } from './genFrameAnimation.mjs';
import { byComponents } from '../entities/byComponents.mjs';
import { getKey } from '../utils/key.mjs';

let COMPRESSED_UID = 0;

export function* crushWallAnimation() {
  const generator = genFrameAnimation(18, 0.25, (props) => {
    const { entity, frame } = props;
    switch (frame) {
      case 0:
        entity.components.add('sprite');
        entity.color = 'dark_gray';
        break;
      case 1:
        entity.color = 'light_gray';
        break;
      case 2:
        entity.color = 'green';
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        entity.x -= 8;
        compressNextTile(entity);
        break;
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        entity.x += 8;
        break;
      case 15:
        entity.color = 'dark_gray';
        break;
      case 16:
        entity.color = 'light_gray';
        break;
      case 17:
        entity.components.delete('sprite');
        entity.components.add('animate-finished');
        COMPRESSED_UID += 1;
        break;
      default:
        // do nothing.
    }
  });
  // first call is init.
  generator.next();

  // Run the Generator
  let props, result;
  do {
    props = yield;
    result = generator.next(props);
  } while (!result.done);
}


/**
 * Compresses solid tile in the path of entity, except for jaw entities.
 */
function compressNextTile(entity) {
  const solidEntities = byComponents(['solid']);
  const keyToCompress = getKey(entity);

  let blocksToCompress = Array.from(solidEntities)
    .filter(solidEntity => getKey(solidEntity) === keyToCompress)
    .filter(solidEntity => !solidEntity.components.has('jaw'));

  if (blocksToCompress.length === 0) {
    return;
  }

  // move the colliding block.
  blocksToCompress.forEach(block => {
    block.x -= 8;
    block.parentID = `compressed_${COMPRESSED_UID}`;
  });

}
