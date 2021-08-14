import { byComponents } from '../components/byComponents.mjs';
import { drawTile } from '../canvas/drawTile.mjs';

// Renders sprites on the screen.
export function spriteSystem() {
  const sprites  = byComponents(['sprite']);

  for (let sprite of sprites) {
    drawTile(sprite.tileID, sprite.x, sprite.y, sprite.color);
  }
}
