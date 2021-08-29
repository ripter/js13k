import { genFrameAnimation } from './genFrameAnimation.mjs';

/**
 * Animated button press
 * @return {Generator}
 */
export function* pushAnimation() {
  const generator = genFrameAnimation(2, 0.25, (props) => {
    const { entity, frame } = props;

    switch (frame) {
      case 0:
        entity.y -= 1;
        break;
      case 1:
        entity.y += 1;
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
