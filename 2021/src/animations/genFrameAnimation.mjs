
/**
 * [genFrameAnimation description]
 * @param  {[type]}    totalFrames               [description]
 * @param  {[type]}    frameDelay                [description]
 * @param  {Function}  callback                  [description]
 * @return {Generator} .next({deltaTime, ...})
 */
export function* genFrameAnimation(totalFrames, frameDelay, callback) {
  let frame = 0;
  let delay = 0;

  while (frame < totalFrames) {
    // YIELD
    const props = yield;
    const { deltaTime } = props;
    // wait until the delay is over before doing the next animation.
    if ((delay - deltaTime) > 0) {
      delay -= deltaTime;
      continue;
    }

    // Run logic with entity and current frame.
    callback({
      frame,
      totalFrames,
      ...props
    });

    // Advance to the next frame and reset the delay.
    frame += 1;
    delay = frameDelay;
  }
}

window.genTest = genFrameAnimation;
