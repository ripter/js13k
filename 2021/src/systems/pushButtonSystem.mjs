import { byComponents } from '../entities/byComponents.mjs';
import { byID } from '../entities/byID.mjs';
import { getKey } from '../utils/key.mjs';
import { pushAnimation } from '../animations/pushButton.mjs';
import { crushWallAnimation } from '../animations/crushWall.mjs';


export function pushButtonSystem(delta) {
  const { downKeys } = byID('input');
  const playerEntities = byComponents(['player']);
  const pushButtonEntities = byComponents(['push-button']);

  // If the player isn't pressing up, we can skip the checks.
  // The button is hardcoded to be on the bottom of the compactor,
  // if this changes, we will need a prop to know the button direction.
  if (playerEntities.size === 0 || !downKeys.has('up')) {
    return;
  }

  const player = Array.from(playerEntities)[0];
  const playerKey = getKey(player);
  // Check if the player is in the right position to push the button.
  for (let pushButton of pushButtonEntities) {
    // Get get for the direction the player should be in to push it.
    const buttonKey = getKey(pushButton, 0, 1);
    if (playerKey !== buttonKey) {
      continue;
    }
    // disable the player while the animation plays.
    player.components.delete('player');
    player.components.add('player-disabled');

    // Animate the button.
    pushButton.animate = pushAnimation();
    pushButton.components.add('animate');

    // Animate the crushing wall.
    byComponents(['crush-wall']).forEach(wallEntity => {
      wallEntity.animate = crushWallAnimation();
      wallEntity.components.add('animate');
    });
  }
}
