import { updateDialog, updateItems, updateUI } from './svg.mjs';

// Loads the scene into state.
// Re-Renders the SVG
export function loadScene(state, scene) {
	// Load Dialog items
	state.dialogs = [...scene.dialogs];
	state.dialogIdx = 0;
	// Open the dialog.
	state.isDialogOpen = true;
	// Reset the SVG.
	updateDialog(state.isDialogOpen, state.dialogs[state.dialogIdx]);
	
	
	// If items is defined in the scene, reset with the new list.
	if ('items' in scene) {
		state.items = {...scene.items};
		updateItems(state.items);
	}
	
	// Update the UI.
	updateUI(state.money);
}