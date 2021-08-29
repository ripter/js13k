import { byID } from '../entities/byID.mjs';

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


const DELAY_TIME = 0.10;
let delay = 0;
export function inputSystem(delta) {
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
      delay = DELAY_TIME;
    }
  }
  // If we are in delay, clear the key set.
  else if (delay > 0) {
    inputEntity.downKeys.clear();
    delay -= delta;
  }
}
