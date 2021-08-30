import { genFrameAnimation } from './genFrameAnimation.mjs';
import { byComponents } from '../entities/byComponents.mjs';

/**
 * Animated
 * @return {Generator}
 */
export function* extendWallAnimation() {
  const generator = genFrameAnimation(2, 0.25, (props) => {
    const { entity, frame } = props;

    switch (frame) {
      case 0:
        entity.components.add('sprite');
        break;
      case 1:
        entity.color = 'green';
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
