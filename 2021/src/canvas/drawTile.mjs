


// Draws a single tile
export function drawTile(tileIndex, x, y, color='white') {
  const tile = tileOffset(tileIndex);
  window.ctx.drawImage(window[`img_${color}`],
             8*tile.x, 8*tile.y, 8, 8,
             x, y, 8, 8)
}

// convert tile index into tile x,y
function tileOffset(index) {
  return {
    x: 0|(index % 14),
    y: 0|(index / 14),
  };
}
