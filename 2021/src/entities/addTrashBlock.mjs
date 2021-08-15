let UUID = 0;

/**
 * Creates and Adds a group_sprite and it's child sprites.
 @param tileX - X position on the grid.
 @param tileY - Y position on the grid.
 @param blocks - [[tileID, color, tileOffsetX, tileOffsetY, rotation], ...]
*/
export function addTrashBlock(tileX, tileY, blocks) {
  const blockID = `trash_${UUID}`;

  const spriteIDs = blocks.map((block, idx) => {
    const pieceID = `${blockID}_${idx}`;
    // Create a sprite for each piece of the block.
    window.ENTITIES.push({
      id: pieceID,
      tileID: block[0],
      color: block[1],
      offsetX: (block[2]*8),
      offsetY: (block[3]*8),
      rotate: block[4] ?? 0,
      components: new Set([
        'sprite',
      ]),
    });
    // Return the ID so the block can keep a list of pieces.
    return pieceID;
  });

  // Trash block is make up of several grouped sprites.
  window.ENTITIES.push({
      id: blockID,
      x: (tileX*8), y: (tileY*8),
      deltaX: 0, deltaY: 0,
      sprites: spriteIDs,
      components: new Set([
        'sprite_group', 'pushable', 'movable',
      ]),
    },
  )

  // cheap UUID
  UUID += 1;
}
