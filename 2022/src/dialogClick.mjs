import { updateDialog, elmDialog, elmDialogText } from './svg.mjs';


// Handle clicking during a dialog.
// Mutates the state object
export function dialogClick(state) {
	const { dialogIdx, dialogs, isDialogOpen, dialogNextAction } = state;
	const line = dialogs[dialogIdx];
	const isOpen = !!line; // close when out of lines.
	
	// Update the SVG
	updateDialog(isOpen, line);
	
	// Update the State.
	state.isDialogOpen = isOpen;
	state.dialogIdx = isOpen ? (dialogIdx+1) : 0;
	state.nextAction = isOpen ? state.nextAction : dialogNextAction;
}

