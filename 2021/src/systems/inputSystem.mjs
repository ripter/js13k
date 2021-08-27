import { byID } from '../entities/byID.mjs';

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

window.addEventListener('keydown', mapKey.bind(null, 'add'));
window.addEventListener('keyup', mapKey.bind(null, 'delete'));

const DELAY_TIME = 0.10;
let delay = 0;
export function inputSystem(delta) {
  const inputEntity = byID('input');

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
