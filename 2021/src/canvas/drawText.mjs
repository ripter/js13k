

export function drawText(msg, x, y, font = '10px monospace') {
  window.ctx.font = font;
  window.ctx.fillStyle = '#FFF';
  window.ctx.fillText(msg, x, y);
}
