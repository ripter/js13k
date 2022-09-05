import { SCENES } from './stages.mjs';
import { loadScene } from './loadScene.mjs';

// 
export function itemClick(id, state) {
	if (!(id in state.items)) return;
	const nextScene = state.items[id];
	// Load the next scene
	loadScene(state, SCENES[nextScene]);
	console.log('exploreClick', id, '\n', state);	
}