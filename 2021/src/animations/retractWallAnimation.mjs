import { genFrameAnimation } from './genFrameAnimation.mjs';
import { byComponents } from '../entities/byComponents.mjs';

/**
 * Animated
 * @return {Generator}
 */
export function* retractWallAnimation() {
  const generator = genFrameAnimation(2, 0.25, (props) => {
    const { entity, frame } = props;

    switch (frame) {
      case 0:
        console.log('retractWallAnimation', frame, entity);
        entity.color = 'dark_gray';
        break;
      case 1:
        entity.components.delete('sprite');
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
