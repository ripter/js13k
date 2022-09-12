import { actionClick } from './actionClick.mjs';


// Handles clicking a choice.
export function choiceClick(state, choiceIdx) {
	const { choices } = state;
	const choice = choices[choiceIdx];
	return actionClick(state, choice[1]);
}