let UUID = 0;

/**
 * Creates and Adds a sprite for each block with the same parent.
 @param tileX - X Tile position, blocks are offset from this position.
 @param tileY - Y Tile position, blocks are offset from this position.
 @param blocks - [[tileID, color, tileOffsetX, tileOffsetY, rotation], ...]
*/
export function addTrashBlock(tileX, tileY, blocks) {
  const parentID = `group_${UUID}`;

  // Create a sprite for each block.
  blocks.forEach((block, idx) => {
    const [tileID, color, tileOffsetX, tileOffsetY, rotation] = block;
    window.ENTITIES.push({
      id: `${parentID}_${idx}`,
      parentID: parentID,
      tileID,
      color,
      rotate: rotation ?? 0,
      x: (tileX*8) + (tileOffsetX*8),
      y: (tileY*8) + (tileOffsetY*8),
      deltaX: 0, deltaY: 0,
      components: new Set([
        'sprite', 'sprite_group', 'solid', 'movable', 'pushable',
      ]),
    });
  });

  // cheap UUID
  UUID += 1;
}
