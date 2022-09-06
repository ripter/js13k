import { updateDialog, elmDialog, elmDialogText } from './svg.mjs';


// Moves to the next dialog line or closes the dialog.
// Mutates the state object
export function dialogClick(state) {
	const { dialogs } = state;
	// Use the *next* item, this is in response, so dialogIdx has already rendered.
	let idx = state.dialogIdx + 1; 
	let line, isOpen;
	// let line = dialogs[idx];
	// let isOpen = !!line; // close when out of lines.
	
	
	// If there are choices, stay on the last line of dialog.
	if ('choices' in state) {
		isOpen = true;
		idx = dialogs.length-1;
		line = dialogs[idx];
	} else {
		line = dialogs[idx];
		isOpen = !!line; // close when out of lines.
	}
	
	// Update the SVG
	updateDialog(isOpen, line);
	
	// Update the State for the next line.
	state.isDialogOpen = isOpen;
	state.dialogIdx = idx;
}

