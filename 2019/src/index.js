import './geometry/extrudeShape.js';
import './components/orbit.js';
import './components/selectable.js';
import './components/float-to.js';
import './components/lock-key.js';
import './components/lock-goal.js';
import './components/timer.js';
import './systems/game';

import { playNote } from './utils/playNote.js';

function playIntro() {
  // ['E4','F4', 'G4', 'F4'].forEach(note => {
  //   playNote(note);
  // });

  document.removeEventListener('click', playIntro);
}

document.addEventListener('click', playIntro);
