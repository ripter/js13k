import { updateDialog } from '../svg.mjs';
import { updateChoiceUI } from '../svg/updateChoiceUI.mjs';


// Moves to the next dialog line or closes the dialog.
// Mutates the state object
export function dialogClick(state) {
	const { dialogs } = state;
	// Use the *next* item, this is in response, so dialogIdx has already rendered.
	let idx = state.dialogIdx + 1; 
	let line = dialogs[idx];
	let isOpen = !!line; // close when out of lines.
		
	// If there are choices, stay on the last line of dialog.
	if ('choices' in state) {
		// Keep the dialog open.
		isOpen = true;
		
		// when on the last line, open the choice ui
		if (idx >= (dialogs.length-1)) {
			idx = (dialogs.length-1);
			line = dialogs[idx];
			state.isChoiceOpen = true;
			// SVG Update
			updateChoiceUI(state.isChoiceOpen, state.choices);
		}
	}
	
	// SVG Update
	updateDialog(isOpen, line);
	
	// Update the State for the next line.
	state.isDialogOpen = isOpen;
	state.dialogIdx = idx;
}

