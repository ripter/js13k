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

  collisionMap.forEach(collisionEntities => {
    const entries = Array.from(collisionEntities);
    const pushableEntity = entries.find(entity => entity.components.has('pushable'));
    // remove it from the group now that it's on the track.
    pushableEntity.parentID = null;
  });
}
