import { STORY } from './const.mjs';
import { cleanup } from './cleanup.mjs';
import { hasLove } from './hasLove.mjs';

// Scene that updates state on a wrong answer.
export function wrongAnswer() {
	const { dialogs} = this;
	const state = this.captcha;
	const { isHumanTest, earnings } = state;
	let message = `Falure. You are done for the night.\nYou Earned ${earnings}.`;
	
	// if the selected choice has love.
	if (hasLove(dialogs[0])) {
		message = `Falure. thx u\nYou Earned ${earnings} tonight.`
		state.storyIdx += 1;
		state.wordIdx = 0;
		
		// Don't move past the last story.
		if (state.storyIdx === STORY.length) {
			state.storyIdx -= 1;	
		}
	}
	
	return {
		isChoiceOpen: true,
		dialogs: [message],
		choices: [
			['End for the Day', cleanup],
		]
	};
}
