import './geometry/extrudeShape.js';
import './components/orbit.js';
import './components/selectable.js';
import './components/float-to.js';
import './components/lock-key.js';
import './components/lock-goal.js';
import './components/timer.js';
import './systems/game.js';
import './systems/sound.js';
import { TEXTURES } from './consts/textures.js';
//
// console.log(TEXTURES);

const elCanvas = document.createElement('canvas');
const context = elCanvas.getContext('2d');

TEXTURES.HAPPY_FACE.draw(context);

elCanvas.id = 'testTexture';
// elCanvas.width = 1;
// elCanvas.height = 1;
// document.body.appendChild(elCanvas);
window.elCanvas = elCanvas;
