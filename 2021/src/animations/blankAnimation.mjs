import { genFrameAnimation } from './genFrameAnimation.mjs';

/**
 * Animated
 * @return {Generator}
 */
export function* blankAnimation() {
  const generator = genFrameAnimation(2, 0.25, (props) => {
    const { entity, frame } = props;
    switch (frame) {
      case 0:
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
