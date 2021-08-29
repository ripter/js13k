import { genFrameAnimation } from './genFrameAnimation.mjs';
import { byComponents } from '../entities/byComponents.mjs';
import { getKey } from '../utils/key.mjs';

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
      // case 8:
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
        entity.color = 'dark_gray';
        break;
      case 15:
        entity.components.delete('sprite');
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
    delete block.parentID;
  });
}
