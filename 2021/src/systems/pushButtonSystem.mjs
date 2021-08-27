import { byComponents } from '../entities/byComponents.mjs';
import { byID } from '../entities/byID.mjs';
import { getKey } from '../utils/key.mjs';


export function pushButtonSystem(delta) {
  const { downKeys } = byID('input');
  const player = byID('player');
  const pushButtonEntities = byComponents(['push-button']);
  const playerKey = getKey(player);

  // If the player isn't pressing up, we can skip the system.
  // The button is hardcoded to be on the bottom of the compactor,
  // if this changes, we will need a prop to know the button direction.
  if (!downKeys.has('up')) {
    return;
  }

  // Check if the player is in the right position to push the button.
  for (let pushButton of pushButtonEntities) {
    // Get get for the direction the player should be in to push it.
    const buttonKey = getKey(pushButton, 0, 1);
    if (playerKey === buttonKey) {
      // Button Pressed!
      console.log('Button Pressed!');
    }
  }
}
