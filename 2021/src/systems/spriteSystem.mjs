import { byComponents } from '../components/byComponents.mjs';
import { drawTile } from '../canvas/drawTile.mjs';

// Renders sprites on the screen.
export function spriteSystem() {
  const { ctx } = window;
  const sprites  = byComponents(['sprite']);

  for (let sprite of sprites) {
    // save the current state
    ctx.save();
    // update state to draw the image with rotation.
    ctx.translate(sprite.x+4, sprite.y+4);
    ctx.rotate(-sprite.rotate ?? 0);
    ctx.translate(-sprite.x-4, -sprite.y-4);
    // draw sprite.
    drawTile(sprite.tileID, sprite.x, sprite.y, sprite.color);
    // restore the previous state
    ctx.restore();
  }
}
