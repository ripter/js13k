import { byComponents } from '../components/byComponents.mjs';
import { createCollisionMap } from '../utils/createCollisionMap.mjs';
import { createEntityMap } from '../utils/createEntityMap.mjs';

/**
 * Handles blocks on the track.
 */
export function trackSystem(delta) {
  const pushableMap = createEntityMap(byComponents(['pushable']));
  const trackMap = createEntityMap(byComponents(['track']));
  const collisionMap = createCollisionMap(pushableMap, trackMap);

  // When a pushable and a track collide,
  // break the parent connection so we can move the single sprite instead of the group.
  collisionMap.forEach(collisionEntities => {
    const entries = Array.from(collisionEntities);
    const pushableEntity = entries.find(entity => entity.components.has('pushable'));
    // remove it from the group now that it's on the track.
    pushableEntity.parentID = null;

    // Also, since right now you can not move it off a track.
    // set the background color here because we never reset it.
    pushableEntity.bgColor = 'black';
  });

}
