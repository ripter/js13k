import { byComponents } from '../entities/byComponents.mjs';
import { extendWallAnimation } from './extendWallAnimation.mjs';
import { genFrameAnimation } from './genFrameAnimation.mjs';
import { pushSolidColumn } from '../utils/pushSolidColumn.mjs';
import { retractWallAnimation } from './retractWallAnimation.mjs';
import { setToMapByKey } from '../utils/setToMapByKey.mjs';
import { moveEntities } from '../utils/moveEntities.mjs';
import { getKey } from '../utils/key.mjs';

/**
 * Animated 2nd crush arm that sweeps the row of blocks into the collection zone.
 * @return {Generator}
 */
export function* sweepIntoCollectionAnimation() {
  const generator = genFrameAnimation(14, 0.25, (props) => {
    const { entity, frame } = props;


    switch (frame) {
      case 0:
      {
        const retractedWallEntities = byComponents(['retract-wall']);
        for (let retractWall of retractedWallEntities) {
          retractWall.animate = retractWallAnimation();
          retractWall.components.add('animate');
        }
        console.log('sweepIntoCollectionAnimation', frame, entity);
        entity.tileID = 104;
      }
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      {
        const trashMap = setToMapByKey(byComponents(['trash-block']), getKey);
        const keyBelowMe = getKey(entity, 0, 1);
        // Move all the entities down one.
        moveEntities(trashMap.get(keyBelowMe), 0, 1);
        // Move myself down one.
        entity.y += 8;
      }
        break;
      case 7:
      {
        const retractedWallEntities = byComponents(['retract-wall'])
        for (let retractedWall of retractedWallEntities) {
          retractedWall.animate = extendWallAnimation();
          retractedWall.components.add('animate');
        }
      }
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        entity.y -= 8;
        break;
      case 13:
        entity.tileID = 1;
        break;
      default:
        // ignore
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
