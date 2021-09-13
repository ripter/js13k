import { byComponents } from '../entities/byComponents.mjs';
import { genFrameAnimation } from './genFrameAnimation.mjs';
import { getKey } from '../utils/key.mjs';
import { sweepIntoCollectionAnimation } from './sweepIntoCollectionAnimation.mjs';
import { setToMapByKey } from '../utils/setToMapByKey.mjs';
import { moveEntities } from '../utils/moveEntities.mjs';
import { playPiano } from '../utils/alphabetPiano.mjs';
import { MUSIC } from '../consts/music.mjs';


/**
 * Main crushing arm of the compactor. It pushes everything into a single column.
 */
export function* crushWallAnimation() {
  const generator = genFrameAnimation(18, 0.25, (props) => {
    const retractWallEntities = byComponents(['retract-wall']);
    const verticalJawEntities = byComponents(['wall-jaw-vertical']);

    const { entity, frame } = props;
    switch (frame) {
      case 0:
        MUSIC[3]();
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
      {
        const trashMap = setToMapByKey(byComponents(['trash-block']), getKey);
        const targetKey = getKey(entity, -1, 0);
        moveEntities(trashMap.get(targetKey), -1, 0);
        // move self
        entity.x -= 8;
      }
        break;
      case 9:
        // Start the 2nd arm animation.
        for (let verticalJaw of verticalJawEntities) {
          verticalJaw.animate = sweepIntoCollectionAnimation();
          verticalJaw.components.add('animate');
        }
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
        // entity.components.add('animate-finished');
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
