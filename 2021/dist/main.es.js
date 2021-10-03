/**
 * Creates and adds imgColor to window.
*/
function addColorImage(colorID, rgb, shouldInvert = false) {
  const img = window.imgBase;
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, img.width, img.height);

  // adjust the color values for each pixel
  for (let i=0; i < imgData.data.length; i += 4) {
    // Check for non-white pixels
    if (imgData.data[i] < 200 && imgData.data[i+1] < 200 && imgData.data[i+2] < 200) {
      imgData.data[i] = shouldInvert ? rgb[0] : 0;
      imgData.data[i+1] = shouldInvert ? rgb[1] : 0;
      imgData.data[i+2] = shouldInvert ? rgb[2] : 0;
      imgData.data[i+3] = shouldInvert ? 255 : 0;
    }
    // white pixels
    else {
      imgData.data[i] = shouldInvert ? 0 : rgb[0];
      imgData.data[i+1] = shouldInvert ? 0 : rgb[1];
      imgData.data[i+2] = shouldInvert ? 0 : rgb[2];
      imgData.data[i+3] = shouldInvert ? 0 : 255;
    }
  }

  // Draw the adjusted image.
  ctx.clearRect(0, 0, img.width, img.height);
  ctx.putImageData(imgData, 0, 0);

  // Get the dataURL fo the new image.
  const imgSrc = canvas.toDataURL();
  const newImg = document.createElement('img');
  newImg.src = imgSrc;
  newImg.style.display = 'none';
  newImg.id = `img_${colorID}`;
  document.body.append(newImg);
}

/**
 * The map is 2d Array of numbers.
 * This maps an index number to an entity.
 */
const mapValues = [
  // 0 is empty, no entity.
  () => (null),
  // 1 is green compactor jaws.
  (tileX, tileY) => ({
    tileID: 104,
    color: 'green',
    x: (tileX*8),
    y: (tileY*8),
    rotate: 90*Math.PI/180,
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'jaw',
    ]),
  }),
  // 2 is green compactor top-left.
  (tileX, tileY) => ({
    tileID: 0,
    color: 'green',
    x: (tileX*8),
    y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 3 is green compactor bottom-left.
  (tileX, tileY) => ({
    tileID: 28, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 4 is green compactor top.
  (tileX, tileY) => ({
    tileID: 1, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 5 is green compactor top-right.
  (tileX, tileY) => ({
    tileID: 3, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 6 is green compactor bottom-right.
  (tileX, tileY) => ({
    tileID: 31, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid',
    ]),
  }),
  // 7 is the compact button
  (tileX, tileY) => ({
    tileID: 48, color: 'light_green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'push-button'
    ]),
  }),
  // 8 is the moving wall
  (tileX, tileY) => ({
    tileID: 104, color: 'green',
    rotate: -90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'crush-wall', 'jaw',
    ]),
  }),
  // 9 is vertical with wall on the right side.
  (tileX, tileY) => ({
    tileID: 104, color: 'green',
    rotate: -90*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'jaw', 'collect-wall-jaw',
    ]),
  }),
  // 10 is a retracting wall
  (tileX, tileY) => ({
    tileID: 1, color: 'green',
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'retract-wall',
    ]),
  }),
  // 11 is a hidden jaw that moves trash into the collection area.
  (tileX, tileY) => ({
    tileID: 1, color: 'green',
    // tileID: 104, color: 'yellow',
    // rotate: 180*Math.PI/180,
    x: (tileX*8), y: (tileY*8),
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'wall-jaw-vertical',
    ]),
  }),
  // 12 is a no-trash allowed tile.
  (tileX, tileY) => ({
    x: (tileX*8), y: (tileY*8),
    components: new Set([
      'no-trash', 
    ]),
  }),
];

/**
 * Creates all the entities in the map.
 * @param {[[2dArray]]} map  2d array. Value is the id of the entity to create.
 */
function addMap(map) {
  for (let y=0; y < map.length; y++) {
    for (let x=0; x < map[0].length; x++) {
      const entityID = mapValues[map[y][x]];
      const entity = entityID(x, y);
      if (entity) {
        window.ENTITIES.push(entity);
      }
    }
  }
}

let UUID = 0;

/**
 * Creates and Adds a sprite for each block with the same parent.
 @param tileX - X Tile position, blocks are offset from this position.
 @param tileY - Y Tile position, blocks are offset from this position.
 @param blocks - [[tileID, color, tileOffsetX, tileOffsetY, rotation], ...]
*/
function addTrashBlock(tileX, tileY, blocks) {
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
        'sprite', 'solid',
        'movable-group', 'trash-block',
      ]),
    });
  });

  // cheap UUID
  UUID += 1;
  return parentID;
}

/**
 * Returns a Set that has all the components in either list.
 * Components inside each list are an AND.
 * Each list is an OR.
 * @param  {[string]} list1
 * @param  {[string]} list2
 * @return {Set}
 */
function byComponents(list1, list2) {
  const set1 = byAllComponents(list1);
  const set2 = byAllComponents(list2);
  const result = new Set();
  const merge = (entity) => result.add(entity);
  set1.forEach(merge);
  set2.forEach(merge);
  return result;
}

/**
 * Returns a Set of all the entities that have every component in the list.
 * @param  {[string]} list
 * @return {Set}
 */
function byAllComponents(list) {
  if (!list || list.length === 0) { return new Set(); }
  const cacheKey = `byComponents(${JSON.stringify(list)})`;

  // if it's in the cache, return it.
  if (window.CACHE_MAP.has(cacheKey)) {
    return window.CACHE_MAP.get(cacheKey);
  }

  // Find all the entities with the required components.
  const entities = window.ENTITIES.reduce((acc, entity) => {
    const doesMatch = list.every(component => entity.components.has(component));
    if (doesMatch) {
      acc.add(entity);
    }
    return acc;
  }, new Set());

  // Add it to the cache and return.
  window.CACHE_MAP.set(cacheKey, entities);
  return entities;
}

/**
 * Returns the entity by ID.
*/
function byID(id) {
  return window.ENTITIES.find(entity => entity.id === id);
}

function animationSystem(deltaTime) {
  const animateEntities = byComponents(['animate']);

  // Run the animation generator on each entity with the animate component.
  for (let animateEntity of animateEntities) {
    const { done } = animateEntity.animate.next({entity: animateEntity, deltaTime});
    if (done) {
      // Clean up the animation.
      animateEntity.components.delete('animate');
    }
  }
}

/**
 * Creates array that can be used with addTrashBlock to create a multi-block trash item.
 * @return [[tileID, color, tileOffsetX, tileOffsetY, rotation], ...]
 */
function createRandomTrashBlocks() {
  const shape = shapes[0|Math.random()*shapes.length];
  const color = colors[0|Math.random()*colors.length];
  const result = [];

  for (let i=0; i < shape.length; i += 2) {
    result.push([
      randomTrashTile(),
      color,
      shape[i],
      shape[i+1],
    ]);
  }

  return result;
}

/**
 * Returns a random trash tile.
 */
function randomTrashTile() {
  const illegalTiles = [0,1,3,5,14,15,17,28,31,39,40,43,44,45,48,53,54,104,131];
  let result;
  do {
    result = 0|Math.random()*140;
  }
  while (illegalTiles.includes(result));
  return result;
}

const colors = [
  // 'dark_gray',
  // 'blue',
  'light_blue',
  // 'light_green',
  'light_cyan',
  'red',
  'light_red',
  // 'magenta',
  'brown',
  'yellow',
  'light_gray',
  'white',
];

const shapes = [
  [0,0, 0,1],
  [0,0, 1,0],
  [0,0, 1,0, 2,0],
  [0,0, 0,1, 0,2],
  [0,0, 0,1, 1,1],
  [0,0, 1,0, 1,1],
  [0,0, 1,0, 0,1, 1,1],
  [0,0, 0,1, 0,2, 1,0],
  [0,0, 1,0, 1,1, 2,1],
];

let useGamepad = false;
const pressedKeys = new Set();

function mapKey(method, evt) {
  switch (evt.code) {
    case 'KeyA':
    case 'ArrowLeft':
      return pressedKeys[method]('left');
    case 'KeyD':
    case 'ArrowRight':
      return pressedKeys[method]('right');
    case 'KeyS':
    case 'ArrowDown':
      return pressedKeys[method]('down');
    case 'KeyW':
    case 'ArrowUp':
      return pressedKeys[method]('up');
  }
}

function mapGamepad() {
  if (!navigator.getGamepads) {
    useGamepad = false;
    console.warn('This browser requires https to support gamepads.');
    return;
  }
  const gamepads = navigator.getGamepads();
  // check if we still have a connected gamepad.
  if (gamepads.length === 0) {
    useGamepad = false;
  }

  // We only care about the first gamepad.
  const gamepad = gamepads[0];
  const leftRight = 0| gamepad.axes[0];
  const upDown = 0| gamepad.axes[1];

  if (leftRight === -1) {
    pressedKeys.add('left');
    pressedKeys.delete('right');
  }
  else if (leftRight === 1) {
    pressedKeys.add('right');
    pressedKeys.delete('left');
  }
  else {
    pressedKeys.delete('right');
    pressedKeys.delete('left');
  }

  if (upDown === -1) {
    pressedKeys.add('up');
    pressedKeys.delete('down');
  }
  else if (upDown === 1) {
    pressedKeys.add('down');
    pressedKeys.delete('up');
  }
  else {
    pressedKeys.delete('up');
    pressedKeys.delete('down');
  }
}


// Listen to widnow events.
window.addEventListener('keydown', mapKey.bind(null, 'add'));
window.addEventListener('keyup', mapKey.bind(null, 'delete'));
window.addEventListener('gamepadconnected', (evt) => { useGamepad = true; });
window.addEventListener('gamepaddisconnected', () => { useGamepad = false; });


window.INPUT_DELAY = 0.5;
// const DELAY_TIME = 1.00;
// const DELAY_TIME = 0.10;
let delay = 0;
function inputSystem(delta) {
  const inputEntity = byID('input');

  // If we have a gamepad, get it's input too.
  if (useGamepad) {
    mapGamepad();
  }

  // If there is no delay and a key was pressed.
  // Set it on the entity.
  if (delay <= 0 && pressedKeys.size > 0) {
    for (let key of pressedKeys) {
      inputEntity.downKeys.add(key);
      delay = window.INPUT_DELAY;
    }
  }
  // If we are in delay, clear the key set.
  else if (delay > 0) {
    inputEntity.downKeys.clear();
    delay -= delta;
  }
}

/**
 * Returns all the entities found by parentID.
 * @returns Map
*/
function byParentID(parentID) {
  return window.ENTITIES.reduce((acc, entity) => {
    // const matchedID = list.find(id => entity.parentID === id);
    if (entity.parentID === parentID) {
      acc.add(entity);
    }
    return acc;
  }, new Set());
}

/**
 * Finds all the items in the set that collide when the two key functions are compared.
 */
function getCollisionsByFunction(set, fnGetKey1, fnGetKey2) {
  return Array.from(set.values()).filter(entity => fnGetKey1(entity) === fnGetKey2(entity));
}

/**
 * Finds all the items in the set that have the same key value.
 */
function getCollisionByKey(key2, fnGetKey1, set) {
  return getCollisionsByFunction(set, fnGetKey1, () => key2);
}

// Returns the entity's x,y key used in maps.
// optional delta.
function getKey(entity, tileDeltaX=0, tileDeltaY=0) {
  const x = 0| (entity.x/8);
  const y = 0| (entity.y/8);
  return `${x+tileDeltaX},${y+tileDeltaY}`;
}

function getDeltaKey(entity) {
  return getKey(entity, entity.deltaX, entity.deltaY);
}

/**
 * Plays a string with a piano sound.
 * Added ability for each note to define length with a pair of chars.
 * Inspired & heavily borrowed from: https://xem.github.io/alphabet-piano/
 * @param  {string} melody - string of charCode/Duration pairs.
 * @example - "aWbH" Duration W, H, Q, E, S
 * @param  {String} [waveform='sine'] - sine, triangle, square, or sawtooth.
 */
function playPiano(melody, maxGain = 0.5, waveform='sine') {
  const actx = new AudioContext();
  const gainNode = new GainNode(actx, { gain: 0 });
  const oscillatorNode = new OscillatorNode(actx, { type: waveform });

  oscillatorNode.connect(gainNode);
  gainNode.connect(actx.destination);

  let runningTime = 0;
  for(let i=0; i < melody.length; i += 2) {
    const freq = 440*1.06**(-105+melody.charCodeAt(i));
    const noteLength = 60 / TEMPO * NOTE_DURATION[melody[i+1]];
    const startTime = runningTime;
    const endTime = startTime+noteLength;
    runningTime = endTime;

    // bail if the note is 0
    if (melody[i] === '0') { continue; }

    // console.log(melody[i], freq);
    // console.group('note');
    // console.log('note', melody[i]);
    // console.log('frequency', freq);
    // console.groupEnd();

    // Change the frequency for each note when it starts.
    oscillatorNode.frequency.setValueAtTime(freq, startTime);
    // Create a "beat" by turning up and down the gain.
    gainNode.gain.setTargetAtTime(maxGain, startTime, 0.05);
    gainNode.gain.setTargetAtTime(0, endTime-0.1, 0.05);
  }

  // run the oscillator node for the length of the melody.
  oscillatorNode.start();
  oscillatorNode.stop(runningTime);

  oscillatorNode.onended = () => {
    // oscillatorNode.disconnect();
    // gainNode.disconnect();
    // actx.close();
  };
}



// For Easy create/debuggin
window.playPiano = playPiano;

/**
 * Creates a new string with the chars from both strings.
 * @param  {string} str1               [description]
 * @param  {string} str2               [description]
 * @return {string} New string with the same length as str1.
 */
function zipString(str1, str2) {
  return str1.split('').map((d, i) => `${str2[i]}${d}`).join('');
}
window.zipString = zipString;

const TEMPO = 120;

const NOTE_DURATION = {
  W: 4, // whole note
  H: 2, // half note
  Q: 1, // quater note
  E: 0.5,
  S: 0.25,
};

const MUSIC = [
    // 0 is idle song.
    () => {
      playPiano('UWVWUW',0.5);
      playPiano('aHbQcQdEdEeEaHfEfEfEgH', 0.25);
    },
    // 1 is a intro music.
    () => {
      const happyRift = 'fQfQgEdQdQ'; // 4.5 beats
      playPiano(`fQfQ${happyRift}`, 0.25, 'sine');
    },
    // 2 is "can't push trash" sound.
    () => {
      playPiano('ZE');
    },
    // 3 is "trash compacting" sound.
    () => {
      playPiano(zipString('WQESQQH', 'ZZaZZZa'));
    },
];

const MELODY = [
  // 0
  'aaabccdde',
];
window.MELODY = MELODY;

const BEATS = [
  // 0 is a build up
  'EEEHQQSQH',
];
window.BEATS = BEATS;

function playerSystem(delta) {
  const { downKeys } = byID('input');
  const entitiesToMove = new Set();
  const movableEntities = byComponents(['movable-group']);
  const playerEntities = byComponents(['player']);
  const solidEntities = byComponents(['solid']);
  const noTrashEntities = byComponents(['solid'],['no-trash']);

  //
  // If there are no keys down, or there is no player
  // we can skip the rest of the system.
  if (downKeys.size === 0 || playerEntities.size === 0) {
    return;
  }
  // We only support one player.
  const player = Array.from(playerEntities)[0];

  //
  // Set the delta direction the player wants to move.
  if (downKeys.has('left')) {
    player.deltaX = -1;
  }
  else if (downKeys.has('right')) {
    player.deltaX = 1;
  }
  else {
    player.deltaX = 0;
  }
  if (downKeys.has('up')) {
    player.deltaY = -1;
  }
  else if (downKeys.has('down')) {
    player.deltaY = 1;
  }
  else {
    player.deltaY = 0;
  }

  // Get the key for the delta position.
  const playerDeltaKey = getDeltaKey(player);
  // Add the player to the list of entities to move.
  entitiesToMove.add(player);


  // Player can push movable-group entities by pushing on any entity in the group.
  // if any entity in the group would collide when moved, then don't move the group.
  const pushedEntities = getCollisionByKey(playerDeltaKey, getKey, movableEntities);
  if (pushedEntities?.length > 0) {
    // Get all the entities in the group the user is pushing on.
    // If the entity isn't part of a group, then use the entity.
    const { parentID } = pushedEntities[0];
    const groupEntities = parentID ? Array.from(byParentID(parentID).values()) : pushedEntities;

    // Check if any entity in the group will collide with a solid if pushed.
    const collisionEntity = groupEntities.find(groupEntity => {
      const groupKey = getKey(groupEntity, player.deltaX, player.deltaY);
      const solidCollsions = getCollisionByKey(groupKey, getDeltaKey, noTrashEntities)
        .filter(entity => entity.parentID !== parentID);
      return solidCollsions.length > 0;
    });

    // No collision, move everyone in the group.
    if (!collisionEntity) {
      groupEntities.forEach(entity => {
        entity.deltaX = player.deltaX;
        entity.deltaY = player.deltaY;
        entitiesToMove.add(entity);
      });
    } else {
      MUSIC[2]();
    }
  }

  //
  // Don't let the player collide with a solid.
  // Clear the delta if the player's delta position would be in the same space as a solid's delta position.
  const solidCollisions = getCollisionByKey(playerDeltaKey, getDeltaKey, solidEntities).filter(entity => entity !== player);
  if (solidCollisions?.length > 0) {
    player.deltaX = 0;
    player.deltaY = 0;
    entitiesToMove.delete(player);
  }

  //
  // Move everyone a single tile by delta.
  entitiesToMove.forEach(entity => {
    entity.x += entity.deltaX * 8;
    entity.y += entity.deltaY * 8;
    // Reset their delta after the move.
    entity.deltaX = 0;
    entity.deltaY = 0;
  });
}

/**
 * [genFrameAnimation description]
 * @param  {[type]}    totalFrames               [description]
 * @param  {[type]}    frameDelay                [description]
 * @param  {Function}  callback                  [description]
 * @return {Generator} .next({deltaTime, ...})
 */
function* genFrameAnimation(totalFrames, frameDelay, callback) {
  let frame = 0;
  let delay = 0;

  while (frame < totalFrames) {
    // YIELD
    const props = yield;
    const { deltaTime } = props;
    // wait until the delay is over before doing the next animation.
    if ((delay - deltaTime) > 0) {
      delay -= deltaTime;
      continue;
    }

    // Run logic with entity and current frame.
    callback({
      frame,
      totalFrames,
      ...props
    });

    // Advance to the next frame and reset the delay.
    frame += 1;
    delay = frameDelay;
  }
}

window.genTest = genFrameAnimation;

/**
 * Animated button press
 * @return {Generator}
 */
function* pushAnimation() {
  const generator = genFrameAnimation(2, 0.25, (props) => {
    const { entity, frame } = props;

    switch (frame) {
      case 0:
        entity.y -= 1;
        break;
      case 1:
        entity.y += 1;
        break;
        // ignore
    }
  });
  // first call is init.
  generator.next();

  // Run the Generator
  let props, result;
  do {
    props = yield;
    result = generator.next(props);
  } while (!result.done);
}

/**
 * Moves a set of entities by tile offset.
 */
function moveEntities(entities, tileOffsetX, tileOffsetY) {
  if (!entities) { return; }
  for (let entity of entities) {
    entity.x += tileOffsetX * 8;
    entity.y += tileOffsetY * 8;
  }
}

/**
 * Converts the Set into a Map.
 * @param {Set} set
 * @param {(item) => string} keyFn
 */
function setToMapByKey(set, keyFn) {
  const map = new Map();

  for(let value of set) {
    const key = keyFn(value);
    if (!map.has(key)) {
      map.set(key, new Set());
    }

    const valueSet = map.get(key);
    valueSet.add(value);
    map.set(key, valueSet);
  }

  return map;
}

/**
 * Collects the compressed trash block and updates the score.
 */
function* collectJawAnimation() {
  const generator = genFrameAnimation(4, 0.25, (props) => {
    const { entity, frame } = props;
    const trashMap = setToMapByKey(byComponents(['trash-block']), getKey);
    const hudEntity = byID('hud');


    switch (frame) {
      case 0:
      {
        for (let disabledPlayer of byComponents(['player-disabled'])) {
          disabledPlayer.components.delete('player-disabled');
          disabledPlayer.components.add('player');
        }
      }
      case 1:
        moveEntities(trashMap.get(getKey(entity, -1, 0)), -1, 0);
        entity.x -= 8;
        break;
      case 2:
        {
          const scoreEntities = trashMap.get(getKey(entity, -1, 0)) ?? [];
          let totalScore = 0;
          for (let scoreEntity of scoreEntities) {
            // remove the trash-block component and give it a score.
            scoreEntity.components.delete('trash-block');
            scoreEntity.components.add('score');
            scoreEntity.score = scoreEntities.size;
            totalScore += scoreEntity.score;
          }
          hudEntity.totalScore += totalScore;
        }
      case 3:
        entity.x += 8;
        break;
        // ignore
    }
  });
  // first call is init.
  generator.next();

  // Run the Generator
  let props, result;
  do {
    props = yield;
    result = generator.next(props);
  } while (!result.done);
}

/**
 * Animated
 * @return {Generator}
 */
function* extendWallAnimation() {
  const generator = genFrameAnimation(2, 0.25, (props) => {
    const { entity, frame } = props;

    switch (frame) {
      case 0:
        entity.components.add('sprite');
        break;
      case 1:
        entity.color = 'green';
        // ignore
    }
  });
  // first call is init.
  generator.next();

  // Run the Generator
  let props, result;
  do {
    props = yield;
    result = generator.next(props);
  } while (!result.done);
}

/**
 * Animated
 * @return {Generator}
 */
function* retractWallAnimation() {
  const generator = genFrameAnimation(2, 0.25, (props) => {
    const { entity, frame } = props;

    switch (frame) {
      case 0:
        entity.color = 'dark_gray';
        break;
      case 1:
        entity.components.delete('sprite');
        // ignore
    }
  });
  // first call is init.
  generator.next();

  // Run the Generator
  let props, result;
  do {
    props = yield;
    result = generator.next(props);
  } while (!result.done);
}

/**
 * Animated 2nd crush arm that sweeps the row of blocks into the collection zone.
 * @return {Generator}
 */
function* sweepIntoCollectionAnimation() {
  const generator = genFrameAnimation(14, 0.25, (props) => {
    const { entity, frame } = props;


    switch (frame) {
      case 0:
      {
        // on frame 0, retract the retractable walls.
        const retractedWallEntities = byComponents(['retract-wall']);
        for (let retractWall of retractedWallEntities) {
          retractWall.animate = retractWallAnimation();
          retractWall.components.add('animate');
        }
        entity.tileID = 104;
      }
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      {
        // Each frame, move the trash blocks under me down one tile.
        // This makes it look like we are pushing them down.
        const trashMap = setToMapByKey(byComponents(['trash-block']), getKey);
        const keyBelowMe = getKey(entity, 0, 1);
        // Move all the entities down one.
        moveEntities(trashMap.get(keyBelowMe), 0, 1);
        // Move myself down one.
        entity.y += 8;
      }
        break;
      case 7:
      {
        // Once all the blocks have been pushed down, put the retracting wall back up.
        const retractedWallEntities = byComponents(['retract-wall']);
        for (let retractedWall of retractedWallEntities) {
          retractedWall.animate = extendWallAnimation();
          retractedWall.components.add('animate');
        }
        // Start the animation to push the block off screen.
        const collectJawEntities = byComponents(['collect-wall-jaw']);
        for (let collectJaw of collectJawEntities) {
          collectJaw.animate = collectJawAnimation();
          collectJaw.components.add('animate');
        }
      }
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        entity.y -= 8;
        break;
      case 13:
        entity.tileID = 1;
        break;
        // ignore
    }
  });
  // first call is init.
  generator.next();

  // Run the Generator
  let props, result;
  do {
    props = yield;
    result = generator.next(props);
  } while (!result.done);
}

/**
 * Main crushing arm of the compactor. It pushes everything into a single column.
 */
function* crushWallAnimation() {
  const generator = genFrameAnimation(18, 0.25, (props) => {
    byComponents(['retract-wall']);
    const verticalJawEntities = byComponents(['wall-jaw-vertical']);

    const { entity, frame } = props;
    switch (frame) {
      case 0:
        MUSIC[3]();
        entity.components.add('sprite');
        entity.color = 'dark_gray';
        break;
      case 1:
        entity.color = 'light_gray';
        break;
      case 2:
        entity.color = 'green';
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      {
        const trashMap = setToMapByKey(byComponents(['trash-block']), getKey);
        const targetKey = getKey(entity, -1, 0);
        moveEntities(trashMap.get(targetKey), -1, 0);
        // move self
        entity.x -= 8;
      }
        break;
      case 9:
        // Start the 2nd arm animation.
        for (let verticalJaw of verticalJawEntities) {
          verticalJaw.animate = sweepIntoCollectionAnimation();
          verticalJaw.components.add('animate');
        }
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        entity.x += 8;
        break;
      case 15:
        entity.color = 'dark_gray';
        break;
      case 16:
        entity.color = 'light_gray';
        break;
      case 17:
        entity.components.delete('sprite');
        // entity.components.add('animate-finished');
        break;
        // do nothing.
    }
  });
  // first call is init.
  generator.next();

  // Run the Generator
  let props, result;
  do {
    props = yield;
    result = generator.next(props);
  } while (!result.done);
}

function pushButtonSystem(delta) {
  const { downKeys } = byID('input');
  const playerEntities = byComponents(['player']);
  const pushButtonEntities = byComponents(['push-button']);

  // If the player isn't pressing up, we can skip the checks.
  // The button is hardcoded to be on the bottom of the compactor,
  // if this changes, we will need a prop to know the button direction.
  if (playerEntities.size === 0 || !downKeys.has('up')) {
    return;
  }

  const player = Array.from(playerEntities)[0];
  const playerKey = getKey(player);
  // Check if the player is in the right position to push the button.
  for (let pushButton of pushButtonEntities) {
    // Get get for the direction the player should be in to push it.
    const buttonKey = getKey(pushButton, 0, 1);
    if (playerKey !== buttonKey) {
      continue;
    }
    // disable the player while the animation plays.
    player.components.delete('player');
    player.components.add('player-disabled');

    // Animate the button.
    pushButton.animate = pushAnimation();
    pushButton.components.add('animate');

    // Animate the crushing wall.
    byComponents(['crush-wall']).forEach(wallEntity => {
      wallEntity.animate = crushWallAnimation();
      wallEntity.components.add('animate');
    });
  }
}

// Draws a single tile
function drawTile(tileIndex, x, y, color='white') {
  const tile = tileOffset(tileIndex);
  window.ctx.drawImage(window[`img_${color}`],
             8*tile.x, 8*tile.y, 8, 8,
             x, y, 8, 8);
}

// convert tile index into tile x,y
function tileOffset(index) {
  return {
    x: 0|(index % 14),
    y: 0|(index / 14),
  };
}

// Renders sprites on the screen.
function spriteSystem() {
  const { ctx } = window;

  // render all the sprites
  byComponents(['sprite']).forEach(sprite => {
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
      ctx.fillRect(sprite.x, sprite.y, 8, 8);
    }
    // draw sprite.
    drawTile(sprite.tileID, sprite.x, sprite.y, sprite.color);
    // restore the previous state
    ctx.restore();
  });
}

/* Copied from: https://github.com/PaulBGD/PixelFont
 * Go checkout his Github and learn more.
 */

 const LETTERS = {
   'A': [
     [, 1],
     [1, , 1],
     [1, , 1],
     [1, 1, 1],
     [1, , 1]
   ],
   'B': [
     [1, 1],
     [1, , 1],
     [1, 1, 1],
     [1, , 1],
     [1, 1]
   ],
   'C': [
     [1, 1, 1],
     [1],
     [1],
     [1],
     [1, 1, 1]
   ],
   'D': [
     [1, 1],
     [1, , 1],
     [1, , 1],
     [1, , 1],
     [1, 1]
   ],
   'E': [
     [1, 1, 1],
     [1],
     [1, 1, 1],
     [1],
     [1, 1, 1]
   ],
   'F': [
     [1, 1, 1],
     [1],
     [1, 1],
     [1],
     [1]
   ],
   'G': [
     [, 1, 1],
     [1],
     [1, , 1, 1],
     [1, , , 1],
     [, 1, 1]
   ],
   'H': [
     [1, , 1],
     [1, , 1],
     [1, 1, 1],
     [1, , 1],
     [1, , 1]
   ],
   'I': [
     [1, 1, 1],
     [, 1],
     [, 1],
     [, 1],
     [1, 1, 1]
   ],
   'J': [
     [1, 1, 1],
     [, , 1],
     [, , 1],
     [1, , 1],
     [1, 1, 1]
   ],
   'K': [
     [1, , , 1],
     [1, , 1],
     [1, 1],
     [1, , 1],
     [1, , , 1]
   ],
   'L': [
     [1],
     [1],
     [1],
     [1],
     [1, 1, 1]
   ],
   'M': [
     [1, 1, 1, 1, 1],
     [1, , 1, , 1],
     [1, , 1, , 1],
     [1, , , , 1],
     [1, , , , 1]
   ],
   'N': [
     [1, , , 1],
     [1, 1, , 1],
     [1, , 1, 1],
     [1, , , 1],
     [1, , , 1]
   ],
   'O': [
     [1, 1, 1],
     [1, , 1],
     [1, , 1],
     [1, , 1],
     [1, 1, 1]
   ],
   'P': [
     [1, 1, 1],
     [1, , 1],
     [1, 1, 1],
     [1],
     [1]
   ],
   'Q': [
     [0, 1, 1],
     [1, , , 1],
     [1, , , 1],
     [1, , 1, 1],
     [1, 1, 1, 1]
   ],
   'R': [
     [1, 1],
     [1, , 1],
     [1, , 1],
     [1, 1],
     [1, , 1]
   ],
   'S': [
     [1, 1, 1],
     [1],
     [1, 1, 1],
     [, , 1],
     [1, 1, 1]
   ],
   'T': [
     [1, 1, 1],
     [, 1],
     [, 1],
     [, 1],
     [, 1]
   ],
   'U': [
     [1, , 1],
     [1, , 1],
     [1, , 1],
     [1, , 1],
     [1, 1, 1]
   ],
   'V': [
     [1, , , , 1],
     [1, , , , 1],
     [, 1, , 1],
     [, 1, , 1],
     [, , 1]
   ],
   'W': [
     [1, , , , 1],
     [1, , , , 1],
     [1, , , , 1],
     [1, , 1, , 1],
     [1, 1, 1, 1, 1]
   ],
   'X': [
     [1, , , , 1],
     [, 1, , 1],
     [, , 1],
     [, 1, , 1],
     [1, , , , 1]
   ],
   'Y': [
     [1, , 1],
     [1, , 1],
     [, 1],
     [, 1],
     [, 1]
   ],
   'Z': [
     [1, 1, 1, 1, 1],
     [, , , 1],
     [, , 1],
     [, 1],
     [1, 1, 1, 1, 1]
   ],
   '0': [
     [1, 1, 1],
     [1, , 1],
     [1, , 1],
     [1, , 1],
     [1, 1, 1]
   ],
   '1': [
     [, 1],
     [, 1],
     [, 1],
     [, 1],
     [, 1]
   ],
   '2': [
     [1,1,1],
     [0,0,1],
     [1,1,1],
     [1,0,0],
     [1,1,1]
   ],
   '3':[
     [1,1,1],
     [0,0,1],
     [1,1,1],
     [0,0,1],
     [1,1,1]
   ],
   '4':[
     [1,0,1],
     [1,0,1],
     [1,1,1],
     [0,0,1],
     [0,0,1]
   ],
   '5':[
     [1,1,1],
     [1,0,0],
     [1,1,1],
     [0,0,1],
     [1,1,1]
   ],
   '6':[
     [1,1,1],
     [1,0,0],
     [1,1,1],
     [1,0,1],
     [1,1,1]
   ],
   '7':[
     [1,1,1],
     [0,0,1],
     [0,0,1],
     [0,0,1],
     [0,0,1]
   ],
   '8':[
     [1,1,1],
     [1,0,1],
     [1,1,1],
     [1,0,1],
     [1,1,1]
   ],
   '9':[
     [1,1,1],
     [1,0,1],
     [1,1,1],
     [0,0,1],
     [1,1,1]
   ],
   ' ': [
     [, ,],
     [, ,],
     [, ,],
     [, ,],
     [, ,]
   ],
   //
   // New Chars added for this game
   ':':[
     [0,1,0],
     [0,1,0],
     [0,0,0],
     [0,1,0],
     [0,1,0],
   ],
   '-': [
     [0,0,0],
     [0,0,0],
     [1,1,1],
     [0,0,0],
     [0,0,0],
   ],
   '"': [
     [1,0,1],
     [1,0,1],
     [0,0,0],
     [0,0,0],
     [0,0,0],
   ],
   '<': [
     [0,0,1],
     [0,1,0],
     [1,0,0],
     [0,1,0],
     [0,0,1],
   ],
   '>': [
     [1,0,0],
     [0,1,0],
     [0,0,1],
     [0,1,0],
     [1,0,0],
   ],
   '.': [
     [0,0,0],
     [0,0,0],
     [0,0,0],
     [0,0,0],
     [1,0,0],
   ],
   ',': [
     [0,0,0],
     [0,0,0],
     [0,0,0],
     [0,1,0],
     [1,0,0],
   ],
   '!': [
     [1],
     [1],
     [1],
     [0],
     [1],
   ],
   '?': [
     [1,1,1],
     [1,0,1],
     [0,1,1],
     [0,1,0],
     [0,0,0],
     [0,1,0],
   ],
 };

// copied from https://github.com/PaulBGD/PixelFont
function drawText(msg, xPos, yPos, color = '#FFF', size = 1) {
  window.ctx.fillStyle = color;

  let currX = 0;
  for (let xMsgPos = 0; xMsgPos < msg.length; xMsgPos++) {
    const letter = LETTERS[msg[xMsgPos].toUpperCase()];
    
    if (!letter) {
      continue;
    }

    let currY = yPos;
    let addX = 0;
    for (let y = 0; y < letter.length; y++) {
      let row = letter[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          window.ctx.fillRect(xPos + currX + x * size, currY, size, size);
        }
      }
      addX = Math.max(addX, row.length * size);
      currY += size;
    }
    currX += size + addX;
  }
}

/*
export function drawText(msg, x, y, color = '#FFF', font = '10px monospace') {
  window.ctx.fillStyle = color;
  window.ctx.font = font;
  window.ctx.fillText(msg, x, y);
}
*/

function formatNumber(val) {
    return new Intl.NumberFormat().format(val);
}

/**
 * Draws the game HUD
 * @param  {number} deltaTime
 */
function hudSystem(deltaTime) {
  const hudEntity = byID('hud');


  // Render the score.
  if (hudEntity.components.has('display-score')) {
    const score = formatNumber(hudEntity.totalScore);
    drawText(`Score: ${score}`, 8, 150);
  }
}

const COLORS = [
  '#FFF',
  '#55F',
  '#0A0',
  '#A00',
  '#F5F',
];

function* cycleColorText(msg, x, y, scale = 1, speed = 1) {
  let delay = speed;
  let colorIndex = 0;

  while (true) {
    const { deltaTime } = yield;
    drawText(msg, x, y, COLORS[colorIndex], scale);

    delay -= deltaTime;
    if (delay <= 0) {
      colorIndex = (colorIndex+1) % COLORS.length;
      delay = speed;
    }
  }
}

/**
 * Deletes all the entities with the component.
 * @param  {string} component
 */
function deleteWithComponent(component) {
  window.ENTITIES = window.ENTITIES.filter(entity => !entity.components.has(component));
}

function* endGameScene() {
  let scoreEntities;
  const hudEntity = byID('hud');
  hudEntity.components.delete('display-score');
  // Setup the player to push around trash.
  const playerEntity = byID('player');
  window.INPUT_DELAY = 0.1;
  playerEntity.components.delete('player-disabled');
  playerEntity.components.add('player');
  // Delete all the old score blocks.
  deleteWithComponent('score');


  // init finished.
  let props = yield;

  const score = formatNumber(props.entity.totalScore);
  const genFlashScore = cycleColorText(`${score}`, 104, 142, 2, 0.5);
  const genFlashLevel = cycleColorText(`Level ${window.level}`, 152, 54, 2, 0.5);

  // Create a block for the user to compress
  addTrashBlock(20, 9, createRandomTrashBlocks());
  do {
    const { entity, deltaTime } = props;
    // Draw the score flashing colors!
    genFlashScore.next({deltaTime});
    genFlashLevel.next({deltaTime});

    drawText(`Total Score:`, 8, 142, '#fff', 2);

    drawText('Great Job!!', 86, 30, '#fff', 3);
    drawText(`You beat`, 118, 54, '#fff', 1);

    drawText('Can you clear the next SPACE?', 86, 96, '#fff', 1);
    drawText(`Compress the trash to try level ${window.level+1}`, 86, 104, '#fff', 1);

    // Yield till the next tick.
    props = yield;
    scoreEntities = byComponents(['score']);
  } while (scoreEntities.size === 0);

  // Start a new Game.
  window.level += 1;
  hudEntity.animate = startNewLevel();


  yield;
  return;
}

// const BLOCKS_TO_CREATE = 1;
function* startNewLevel() {
  const totalTrash = 5 * window.level;
  // let the player move faster with a lower input delay
  window.INPUT_DELAY = 0.1;

  // Enable the player.
  const playerEntity = byID('player');
  playerEntity.components.delete('player-disabled');
  playerEntity.components.add('player');

  // Reset the score.
  const hudEntity = byID('hud');
  hudEntity.totalScore = 0;
  hudEntity.components.add('display-score');

  // get the entities that collide with a new trash block.
  const noTrashEntities = byComponents(['solid'],['no-trash']);
  // Create the trash blocks for the level.
  for (let i=0; i < totalTrash; i++) {
    // Create a random trash block.
    let trashData = createRandomTrashBlocks();

    // Find a position that doesn't have the trash colliding
    let tileX, tileY, doesCollide;
    do {
      tileX = (0|(Math.random() * window.c.width)/8)+1;
      tileY = (0|(Math.random() * window.c.height)/8)+1;
      doesCollide = trashData.find(block => {
        let collisionKey = getKey({x: tileX*8, y: tileY*8}, block[2], block[3]);
        let collisions = getCollisionByKey(collisionKey, getKey, noTrashEntities);
        const blockX = tileX + block[2];
        const blockY = tileY + block[3];
        // if there is a collision, or if the tile would be on the edge of off screen.
        // then return false so we can pick a new position.
        return collisions.length > 0
          // Check if the block would be on the edge
          || blockX >= 31
          || blockY >= 19;

      });
    } while (doesCollide);

    // Add the block.
    const parentID = addTrashBlock(tileX, tileY, trashData);
    // Update the set since it it cached each tick.
    byParentID(parentID).forEach(entity => {
      noTrashEntities.add(entity);
    });
  }

  // init finished.
  yield;


  // Loop until the user compacts all the trash.
  let trashEntities;
  do {
    trashEntities = byComponents(['trash-block']);
    yield;
  } while (trashEntities.size > 0);

  //
  // Switch to end game
  hudEntity.animate = endGameScene(),
  yield;
}

function* introAnimation(args) {
  const inputEntity = byID('input');
  const playerEntity = byID('player');
  const hudEntity = byID('hud');
  const genHeader = cycleColorText('JS13kGame 2021 - "SPACE"', 8, 8, 2);


  // Show Title unill a button is pressed.
  while (inputEntity.downKeys.size === 0) {
    let { deltaTime } = yield;
    // Animated title
    genHeader.next({deltaTime});
  }

  MUSIC[1]();
  // Point out the player
  yield; // pause for a tick.
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('<- This is you.', playerEntity.x + 10, playerEntity.y+2, COLORS[0], 1);
  }

  // Point out trash
  yield; // pause for a tick.
  addTrashBlock(18, 9, createRandomTrashBlocks());
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('This is trash. ->', playerEntity.x + 10, playerEntity.y+2, COLORS[0], 1);
  }

  // Point out the compactor
  yield;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('This is the Trash Compactor.', 16, 32, COLORS[0], 1);
    drawText('VVVV', 16, 40, COLORS[0], 1);
  }

  // Point out the button.
  yield;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('<- This is the compact button.', 56, 108, COLORS[0], 1);
  }

  // How to play
  yield;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('Push trash in the Compactor.', 80, 112, COLORS[0], 1);
    drawText('Push the button to compress it.', 80, 120, COLORS[0], 1);
  }

  // Wait until the player compresses the block.
  yield;
  playerEntity.components.delete('player-disabled');
  playerEntity.components.add('player');
  window.INPUT_DELAY = 0.1;
  let scoreEntities;
  do {
    scoreEntities = byComponents(['score']);
    yield;
  } while (scoreEntities.size === 0);


  window.INPUT_DELAY = 0.5;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('The more trash you compress, ', 80, 112, COLORS[0], 1);
    drawText('the higher the score.', 80, 120, COLORS[0], 1);
  }

  yield;
  while (inputEntity.downKeys.size === 0) {
    yield;
    drawText('Clear the SPACE', 80, 112, COLORS[0], 1);
    drawText('and get the highest score!', 80, 120, COLORS[0], 1);
  }

  // Start a new Game.
  window.level = 1;
  hudEntity.animate = startNewLevel();
  // We need to yield after setting a new animation so that this animation
  // won't terminate and remove the component.
  yield;
  // return ends the Generator.
  return;
}

// create colored sprite sheets.
addColorImage('black', [0x00, 0x00, 0x00]);
addColorImage('dark_gray', [0x55, 0x55, 0x55]);
addColorImage('blue', [0x00, 0x00, 0xAA]);
addColorImage('light_blue', [0x55, 0x55, 0xFF]);
addColorImage('green', [0x00, 0xAA, 0x00]);
addColorImage('light_green', [0x55, 0xFF, 0x55]);
addColorImage('cyan', [0x00, 0xAA, 0xAA]);
addColorImage('light_cyan', [0x55, 0xFF, 0xFF]);
addColorImage('red', [0xAA, 0x00, 0x00]);
addColorImage('light_red', [0xFF, 0x55, 0x55]);
addColorImage('magenta', [0xAA, 0x00, 0xAA]);
addColorImage('light_magenta', [0xFF, 0x55, 0xFF]);
addColorImage('brown', [0xAA, 0x55, 0x00]);
addColorImage('yellow', [0xFF, 0xFF, 0x55]);
addColorImage('light_gray', [0xAA, 0xAA, 0xAA]);
addColorImage('white', [0xFF, 0xFF, 0xFF]);


window.level = 1;
window.IS_RUNNING = true;
// list of all entities in the game.
window.ENTITIES = [
  // Input Keys/Gamepad Entity.
  {
    id: 'input',
    downKeys: new Set(),
    components: new Set([
      'input'
    ]),
  },
  {
    id: 'hud',
    totalScore: 999999999,
    animate: introAnimation(),
    // animate: startNewLevel(),
    // animate: endGameScene(),
    components: new Set([
      'ui', 'hud', 'animate',
    ]),
  },
  // Player
  {
    id: 'player',
    tileID: 5,
    color: 'light_magenta',
    x: 64, y: 72,
    deltaX: 0, deltaY: 0,
    components: new Set([
      'sprite', 'solid', 'player-disabled',
    ]),
  },
];
// keep a cache of the entity maps used each tick.
window.CACHE_MAP = new Map();


addMap([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2,11, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3,10, 4, 4, 4, 4, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 9,12,12,12, 7,12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 4, 6,12,12,12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);



// addTrashBlock(0, 0, [[17, 'red', 0, 0]])

// Get the 2d Context
window.ctx = window.c.getContext('2d');

// Game loop
let lastTime = 0;
(function gameLoop() {
  let currentTime = Date.now();
  let delta = (currentTime - lastTime) / 1000;

  // Run the systems.
  [
    () => window.ctx.clearRect(0, 0, window.c.width, window.c.height),
    () => window.CACHE_MAP.clear(),
    inputSystem,
    playerSystem,
    pushButtonSystem,
    animationSystem,
    spriteSystem,
    hudSystem,
  ].forEach(system => system(delta));

  lastTime = currentTime;
  // loop as long as the game is running.
  // global for easy debugging on the console.
  if (window.IS_RUNNING) {
    window.requestAnimationFrame(gameLoop);
  }
})();
