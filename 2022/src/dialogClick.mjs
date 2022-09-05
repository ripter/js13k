import { updateDialog, elmDialog, elmDialogText } from './svg.mjs';


// Moves to the next dialog line or closes the dialog.
// Mutates the state object
export function dialogClick(state) {
	const { dialogs } = state;
	// Use the *next* item, this is in response, so dialogIdx has already rendered.
	const idx = state.dialogIdx + 1; 
	const line = dialogs[idx];
	const isOpen = !!line; // close when out of lines.
	
	// Update the SVG
	updateDialog(isOpen, line);
	
	// Update the State
	state.isDialogOpen = isOpen;
	state.dialogIdx = idx;
}

