import { genFrameAnimation } from './genFrameAnimation.mjs';
import { extendWallAnimation } from './extendWallAnimation.mjs';
import { byComponents } from '../entities/byComponents.mjs';

/**
 * Animated
 * @return {Generator}
 */
export function* sweepIntoCollectionAnimation() {
  const generator = genFrameAnimation(14, 0.25, (props) => {
    const { entity, frame } = props;
    switch (frame) {
      case 0:
        console.log('sweepIntoCollectionAnimation', frame, entity);
        entity.tileID = 104;
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        entity.y += 8;
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
