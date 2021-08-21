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

    // Draw collision box
    // ctx.strokeStyle = 'orange';
    // ctx.strokeRect(sprite.x, sprite.y, 8, 8);

    // check if this sprite wants a back ground color.
    if (sprite.bgColor) {
      ctx.fillStyle = sprite.bgColor;
      ctx.fillRect(sprite.x, sprite.y, 8, 8)
    }
    // draw sprite.
    drawTile(sprite.tileID, sprite.x, sprite.y, sprite.color);
    // restore the previous state
    ctx.restore();
  }
}
