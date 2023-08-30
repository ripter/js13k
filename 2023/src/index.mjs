import { loadJSON } from './loadJson.mjs';
import { Player } from './Player.mjs';

import './components/scenario-dropdown.mjs';

const { elmScenarioPicker } = window;

const scenarioList = await loadJSON('scenarios/index.json');
elmScenarioPicker.options = scenarioList;
console.log('scenarioList', scenarioList);

const playerState = new Player();
console.log('playerState', playerState);
window.playerState = playerState;
