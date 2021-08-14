import { byID } from '../components/byID.mjs';

const downKeys = new Set();

function mapKey(method, evt) {
  switch (evt.code) {
    case 'KeyA':
    case 'ArrowLeft':
      return downKeys[method]('left');
    case 'KeyD':
    case 'ArrowRight':
      return downKeys[method]('right');
    case 'KeyS':
    case 'ArrowDown':
      return downKeys[method]('down');
    case 'KeyW':
    case 'ArrowUp':
      return downKeys[method]('up');
  }
}

window.addEventListener('keydown', mapKey.bind(null, 'add'));
window.addEventListener('keyup', mapKey.bind(null, 'delete'));



let delay = 0;
export function inputSystem(delta) {
  const SPEED = 100;
  const player = byID('player');

  // create a delay between responding to button presses.
  delay += delta;
  if (delay < 0.25) {
    return;
  }
  delay = 0;


  if (downKeys.has('left')) {
    player.deltaX -= 8;
  }
  else if (downKeys.has('right')) {
    player.deltaX += 8;
  }
  if (downKeys.has('up')) {
    player.deltaY -= 8;
  }
  else if (downKeys.has('down')) {
    player.deltaY += 8;
  }
}
