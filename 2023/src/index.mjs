// Custom Elements
import './elements/card-challenge.mjs';
import './elements/image-reward.mjs';
import './elements/image-pawn.mjs';
// import './elements/list-pond.mjs';
// import './elements/player-info.mjs';

// Dispatch functions.
import { dispatchNewGame } from './dispatch/newGame.mjs';
// import { dispatchAttentionMode } from './dispatch/attentionMode.mjs';

// Start the Game
dispatchNewGame();
// dispatchAttentionMode();