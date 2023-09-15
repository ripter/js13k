// Custom Elements
import './elements/card-challenge.mjs';
import './elements/image-reward.mjs';
import './elements/image-pawn.mjs';
import './elements/player-info.mjs';
import './elements/player-hand.mjs';
import './elements/list-pond.mjs';
import './elements/modal-challenge.mjs';
import './elements/game-dialog.mjs';
import './elements/number-spinner.mjs';

// Dispatch functions.
import { dispatchNewGame } from './dispatch/newGame.mjs';

// Start the Game and put it in Attention Mode
await dispatchNewGame();
