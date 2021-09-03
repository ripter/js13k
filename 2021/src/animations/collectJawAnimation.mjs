import { byComponents } from '../entities/byComponents.mjs';
import { genFrameAnimation } from './genFrameAnimation.mjs';
import { getKey } from '../utils/key.mjs';
import { moveEntities } from '../utils/moveEntities.mjs';
import { setToMapByKey } from '../utils/setToMapByKey.mjs';
import { byID } from '../entities/byID.mjs';


/**
 * Collects the compressed trash block and updates the score.
 */
export function* collectJawAnimation() {
  const generator = genFrameAnimation(4, 0.25, (props) => {
    const { entity, frame } = props;
    const trashMap = setToMapByKey(byComponents(['trash-block']), getKey);
    const hudEntity = byID('hud');


    switch (frame) {
      case 0:
      {
        for (let disabledPlayer of byComponents(['player-disabled'])) {
          disabledPlayer.components.delete('player-disabled');
          disabledPlayer.components.add('player');
        }
      }
      case 1:
        moveEntities(trashMap.get(getKey(entity, -1, 0)), -1, 0);
        entity.x -= 8;
        break;
      case 2:
        {
          const scoreEntities = trashMap.get(getKey(entity, -1, 0));
          let totalScore = 0;
          for (let scoreEntity of scoreEntities) {
            // remove the trash-block component and give it a score.
            scoreEntity.components.delete('trash-block');
            scoreEntity.components.add('score');
            scoreEntity.score = scoreEntities.size;
            totalScore += scoreEntity.score;
          }
          hudEntity.totalScore += totalScore;
        }
      case 3:
        entity.x += 8;
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
