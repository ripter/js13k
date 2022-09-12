import { updateDialog, updateItems, updateUI } from './svg.mjs';
import { updateChoiceUI } from './svg/updateChoiceUI.mjs';
import { updateCaptchaLevel } from './svg/updateCaptchaLevel.mjs';

// Loads the scene into state.
// Re-Renders the SVG
export function loadScene(state, scene) {
	//
	// if the dialog is defined, load and start it.
	if ('dialogs' in scene) {
		// Load Dialog items
		state.dialogs = [...scene.dialogs];
		state.dialogIdx = 0;
		// Open the dialog.
		state.isDialogOpen = true;
		// Reset the SVG.
		updateDialog(state.isDialogOpen, state.dialogs[state.dialogIdx]);
	} else {
		// close the dialog if it was open.
		state.isDialogOpen = false;
		updateDialog(false);
	}
	//	
	// Choice Options
	state.isChoiceOpen = scene?.isChoiceOpen ?? false;
	if ('choices' in scene) {
		state.choices = [...scene.choices];
	}
	else {
		delete state.choices;
	}
	updateChoiceUI(state.isChoiceOpen, state.choices  ?? []);
	
	//
	// Captcha Filters.
	updateCaptchaLevel(scene.captcha);
	
	//
	// If items is defined in the scene, reset with the new list.
	if ('items' in scene) {
		state.items = {...scene.items};
		updateItems(state.items);
	}
	
	// Update the UI.
	updateUI(state.money);
}