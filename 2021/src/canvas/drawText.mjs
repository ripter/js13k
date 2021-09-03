

export function drawText(msg, x, y, color = '#FFF', font = '10px monospace') {
  window.ctx.font = font;
  window.ctx.fillStyle = color;
  window.ctx.fillText(msg, x, y);
}
