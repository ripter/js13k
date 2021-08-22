import { byComponents } from '../components/byComponents.mjs';
import { createCollisionMap } from '../utils/createCollisionMap.mjs';
import { createEntityMap } from '../utils/createEntityMap.mjs';
import { logicANDMaps } from '../utils/logicANDMaps.mjs';

/**
 * Handles blocks on the track.
 */
export function trackSystem(delta) {
  const pushableMap = byComponents(['pushable']);
  const trackMap = byComponents(['track']);
  const collisionMap = logicANDMaps(pushableMap, trackMap);
  // const collisionMap = createCollisionMap(pushableMap, trackMap);

  // When a pushable and a track collide,
  // split the pushable into a single entity and switch it to being on-track instead.
  collisionMap.forEach(collisionEntities => {
    const entries = Array.from(collisionEntities);
    // const trackEntity = entries.find(entity => entity.components.has('track'));
    const pushableEntity = entries.find(entity => entity.components.has('pushable'));
    // remove it from the group now that it's on the track.
    pushableEntity.parentID = null;
    // Remove it from pushable, it's on the track now!
    pushableEntity.components.delete('pushable');
    // Add it to on-track so it can be animated as it moves.
    pushableEntity.components.add('on-track');
    // Give it a velocity
    pushableEntity.velocity = 80;

    // Also, since right now you can not move it off a track.
    // set the background color here because we never reset it.
    pushableEntity.bgColor = 'black';
  });

}
