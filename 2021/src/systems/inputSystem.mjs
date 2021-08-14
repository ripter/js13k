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



export function inputSystem(delta) {
  const SPEED = 100;
  const player = byID('player');

  if (downKeys.has('left')) {
    player.deltaX -= delta * SPEED;
  }
  else if (downKeys.has('right')) {
    player.deltaX += delta * SPEED;
  }
  if (downKeys.has('up')) {
    player.deltaY -= delta * SPEED;
  }
  else if (downKeys.has('down')) {
    player.deltaY += delta * SPEED;
  }
}
