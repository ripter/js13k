import { SCENES } from './stages.mjs';
import { loadScene } from './loadScene.mjs';
import { identity } from './actions/identity.mjs';

// handles item/choice clicks. 
export function actionClick(state, args) {
	if (args === -1) return; // -1 takes no action when clicked.
	let nextScene;
	
	// if the args are an array the first element is the function to call.
	if (args instanceof Array) {
		const params = [...args];
		const func = params.shift();	
		nextScene = func.apply(state, params);
	}
	else if (typeof args === 'number') {
		nextScene = SCENES[identity(args)];
	}
	
	// Load the next scene
	if (nextScene) {
		// state.lastSceneIndex = state.sceneIndex;
		// state.sceneIndex = nextSceneIdx;
		loadScene(state, nextScene);
	}
}