import { updateDialog } from './svg.mjs';

// Loads the scene into state.
export function loadScene(state, scene) {
	// Load Dialog items
	state.dialogs = [...scene.dialogs];
	state.dialogIdx = 0;
	// Open the dialog.
	state.isDialogOpen = true;
	// Reset the SVG.
	updateDialog(state.isDialogOpen, state.dialogs[state.dialogIdx]);
	
	
	// Load the item map.
	state.items = {...scene.items};
	
	// Load the starting action.	
	state.nextAction = scene.nextAction;
}