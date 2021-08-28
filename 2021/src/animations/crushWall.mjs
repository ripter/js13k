
export function* crushWallAnimation() {
  const DURATION = 8.0;
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
    const percentageComplete = position / DURATION;
    // wait until the delay is over before doing the next animation.
    if (delay > 0) {
      delay -= deltaTime;
      continue;
    }

    // Make it a sprite so it is visible.
    // entity.components.add('sprite');

    console.log('percentageComplete', percentageComplete);
    if (percentageComplete >= 0.7) {
      entity.x += 8;
    }
    else if (percentageComplete >= 0.5) {
      entity.x -= 8;
    }
    else if (percentageComplete >= 0.2) {
      entity.color = 'green';
      delete entity.didMove;
    }
    else if (percentageComplete >= 0.15) {
      entity.color = 'dark_gray';
      if (!entity.didMove) {
        entity.x -= 8;
        entity.didMove = true;
      }
    }
    else if (percentageComplete >= 0.10) {
      entity.components.add('sprite');
      entity.color = 'light_gray';
    }
    // else if (percentageComplete < 0.3) {
    //   console.log('percentageComplete', percentageComplete);
    //   entity.color = 'dark_gray';
    //   entity.x -= 8;
    // }
    // else if (percentageComplete < 0.76) {
    //   // do nothing yet.
    // }
    // else {
    //   entity.color = 'green';
    // }

    // if (position < (DURATION/4)) {
    //   entity.color = 'dark_gray';
    // }
    // else if (position < (DURATION/3)) {
    //   entity.color = 'light_gray';
    // }
    // else if (position < (DURATION/2)){
    //   entity.color = 'green';
    // }


    // Update the delay between animation frames.
    delay = FRAME_DELAY;
  }


}
