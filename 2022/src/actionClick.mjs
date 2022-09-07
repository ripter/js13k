import { SCENES } from './stages.mjs';
import { loadScene } from './loadScene.mjs';
import { identity } from './actions/identity.mjs';

// handles item/choice clicks. 
export function actionClick(state, args) {
	if (args === -1) return; // -1 takes no action when clicked.
	let nextSceneIdx = -1;
	
	// if the args are an array the first element is the function to call.
	if (args instanceof Array) {
		const func = args.shift();	
		nextSceneIdx = func.apply(state, args);
	}
	else if (typeof args === 'number') {
		nextSceneIdx = identity(args);
	}
	
	// Load the next scene
	if (-1 !== nextSceneIdx) {
		state.lastSceneIndex = state.sceneIndex;
		state.sceneIndex = nextSceneIdx;
		loadScene(state, SCENES[state.sceneIndex]);
	}
	console.log('state', state);
}