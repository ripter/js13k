import { updateDialog } from './svg.mjs';

// Loads the scene into state.
export function loadScene(state, scene) {
	// Load Dialog items
	state.dialogs = [...scene.dialogs];
	state.dialogNextAction = scene.dialogNextAction;
	// Reset the SVG.
	updateDialog(state.isDialogOpen, '');
	
	
	// Load the starting action.	
	state.nextAction = scene.nextAction;
}