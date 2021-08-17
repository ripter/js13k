
/**
 * Adds the Trash Compactor to the game.
*/
export function addCompactor(tileX, tileY) {
  // blocks [tileID, color, tileOffsetX, tileOffsetY, rotation]
  // Compactor
  [
    [0,  'green', 0, 0], [1, 'green', 1, 0], [1, 'green', 2, 0], [1, 'green', 3, 0], [1, 'green', 4, 0],
    [104, 'green', 0, 1, 90*Math.PI/180],
    [104, 'green', 0, 2, 90*Math.PI/180],
    [104, 'green', 0, 3, 90*Math.PI/180],
    [104, 'green', 0, 4, 90*Math.PI/180],
    [104, 'green', 0, 5, 90*Math.PI/180],
    [28, 'green', 0, 6], [1, 'green', 1, 6], [1, 'green', 2, 6], [1, 'green', 3, 6], [1, 'green', 4, 6],
  ].forEach((block, idx) => {
    const [tileID, color, tileOffsetX, tileOffsetY, rotate] = block;
    window.ENTITIES.push({
      tileID, color, rotate,
      x: (tileX*8) + (tileOffsetX*8),
      y: (tileY*8) + (tileOffsetY*8),
      deltaX: 0, deltaY: 0,
      components: new Set([
        'sprite', 'solid',
      ]),
    })
  });

  // Conveyor
  [
    [40, 'cyan', 1, 1], [40, 'cyan', 2, 1], [40, 'cyan', 3, 1], [40, 'cyan', 4, 1], [39, 'cyan', 5, 1, 180*Math.PI/180], [40, 'cyan', 5, 0, 90*Math.PI/180],
    [40, 'cyan', 1, 3], [40, 'cyan', 2, 3], [40, 'cyan', 3, 3], [40, 'cyan', 4, 3], [40, 'cyan', 5, 3], [40, 'cyan', 5, 3],
    [40, 'cyan', 1, 5], [40, 'cyan', 2, 5], [40, 'cyan', 3, 5], [40, 'cyan', 4, 5], [39, 'cyan', 5, 5, -90*Math.PI/180], [40, 'cyan', 5, 6, 90*Math.PI/180],
  ].forEach((block, idx) => {
    const [tileID, color, tileOffsetX, tileOffsetY, rotate] = block;
    window.ENTITIES.push({
      tileID, color, rotate,
      x: (tileX*8) + (tileOffsetX*8),
      y: (tileY*8) + (tileOffsetY*8),
      pushX: -1, pushY: 0,
      components: new Set([
        'sprite', 'pusher',
      ]),
    })
  });
}
