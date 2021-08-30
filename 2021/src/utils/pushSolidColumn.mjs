import { byComponents } from '../entities/byComponents.mjs';
import { getKey } from './key.mjs';
import { setToMapByKey } from '../utils/setToMapByKey.mjs';
import { moveEntities } from './moveEntities.mjs';


export function pushSolidColumn(startEntity) {
  const solidEntities = byComponents(['solid']);
  const solidEntityMap = setToMapByKey(solidEntities, getKey);
  console.log('solidEntityMap', solidEntityMap);

  // is there a solid below me?
  let keyForNextSolid = getKey(startEntity, 0, 1);
  if (solidEntityMap.has(keyForNextSolid)) {
    // move all the entities in the next position down one tile.
    moveEntities(solidEntityMap.get(keyForNextSolid), 0, 1);
  }
  else {
    // Move myself down one tile.
    startEntity.y -= 8;
  }


  /*
  const touchingEntities = new Set();

  let targetEntities = new Set([startEntity]);
  let targetKey = getKey(startEntity, delta.x, delta.y);
  console.group('push solid column')
  console.log('startEntity', startEntity);
  console.log('startKey', targetKey);
  // let isTouching = true;
  do {
    // get the next target, aka solid in the column.
    targetKey = getKey(targetEntity, delta.x, delta.y);
    targetEntities = solidEntityMap.get(targetKey);
    console.log('target', targetKey, targetEntity);

    for (let targetEntity of targetEntities) {
      // move the entity down one tile.
      targetEntity.y += 8;
    }

    // get the next target, aka solid in the column.
    // targetKey = getKey(targetEntity, delta.x, delta.y);
    // targetEntity = solidEntityMap.get(targetKey);
  } while (targetEntity.size > 0);


  console.groupEnd();
  */
  // let
  // const connectedEntities = Array.from(solidEntities.values()).filter(solidEntity => {
  //
  // });
}
