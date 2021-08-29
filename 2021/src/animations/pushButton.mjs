
/**
 * Animated button press
 * @return {Generator}
 */
export function* pushAnimation() {
  const DURATION = 0.5;
  const FRAME_DELAY = 0.25;
  let position = 0;
  let delay = 0;
  let props;

  while (position <= DURATION) {
    // YIELD
    props = yield;
    const { entity, deltaTime } = props;
    // Update the animation position so we know when we are done.
    position += deltaTime;
    // wait until the delay is over before doing the next animation.
    if (delay > 0) {
      delay -= deltaTime;
      continue;
    }

    // move in and out.
    if (position <= DURATION/2) {
      entity.y -= 1;
    }
    else {
      entity.y += 1;
    }

    // Update the delay between animation frames.
    delay = FRAME_DELAY;
  }

  // Reset the components so it can be animated again.
  props.entity.components.add('push-button');
}
