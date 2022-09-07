import { updateDialog, elmDialog, elmDialogText, updateChoiceUI } from './svg.mjs';


// Moves to the next dialog line or closes the dialog.
// Mutates the state object
export function dialogClick(state) {
	const { dialogs } = state;
	// Use the *next* item, this is in response, so dialogIdx has already rendered.
	let idx = state.dialogIdx + 1; 
	// const length = dialogs.length-1;
	let line = dialogs[idx];
	let isOpen = !!line; // close when out of lines.
		
	// If there are choices, stay on the last line of dialog.
	if ('choices' in state) {
		// Keep the dialog open.
		isOpen = true;
		
		// when on the last line, open the choice ui
		if (idx >= (dialogs.length-1)) {
			idx = (dialogs.length-1);
			state.isChoiceOpen = true;
			updateChoiceUI(state.isChoiceOpen, Object.keys(state.choices));
		}
		
		// if the index is past the end, and the choice isn't open yet.
		// open the choice dialog.
		// if (idx >= length && !state.isChoiceOpen) {
		// 	line = dialogs[length];
		// 	state.isChoiceOpen = true;
		// 	updateChoiceUI(state.isChoiceOpen, Object.keys(state.choices));
		// }
	// } else {
	// 	line = dialogs[idx];
	// 	isOpen = !!line; // close when out of lines.
	}
	
	// Update the SVG
	updateDialog(isOpen, line);
	
	// Update the State for the next line.
	state.isDialogOpen = isOpen;
	state.dialogIdx = idx;
}

