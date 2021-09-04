import { byID } from '../entities/byID.mjs';
import { drawText } from '../canvas/drawText.mjs';

/**
 * Draws the game HUD
 * @param  {number} deltaTime
 */
export function hudSystem(deltaTime) {
  const hudEntity = byID('hud');


  // render the HUD.
  // console.log('draw Score');
  // drawText(`Score: ${hudEntity.totalScore}`, 8, 152);
  drawText(`Score: ${hudEntity.totalScore}`, 8, 150);
}
