import { SCENES } from '../stages.mjs';
import { loadScene } from '../loadScene.mjs';
import { identity } from '../actions/identity.mjs';

// Loads a scene after running an optional action function.
// Action functions get this === state
export function actionClick(state, action) {
	if (action === -1) return; // -1 takes no action when clicked.
	let nextScene;
	
	if (typeof action === 'number') {
		nextScene = identity(action);
	}
	else if (typeof action === 'function') {
		nextScene = action.call(state);
	}
	else {
		throw new Error('Unknown action', action);
	}
	
	// Load the next scene
	loadScene(state, nextScene);
}