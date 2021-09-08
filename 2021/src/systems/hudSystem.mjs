import { byID } from '../entities/byID.mjs';
import { drawText } from '../canvas/drawText.mjs';
import { formatNumber } from '../utils/formatNumber.mjs';

/**
 * Draws the game HUD
 * @param  {number} deltaTime
 */
export function hudSystem(deltaTime) {
  const hudEntity = byID('hud');


  // Render the score.
  if (hudEntity.components.has('display-score')) {
    const score = formatNumber(hudEntity.totalScore)
    drawText(`Score: ${score}`, 8, 150);
  }
}
