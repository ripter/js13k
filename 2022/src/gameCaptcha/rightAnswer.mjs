import { STORY, FILTER } from './const.mjs';
import { cleanup } from './cleanup.mjs';
import { runCaptcha } from './index.mjs';

// Returns the scene on a successful captcha answer.
export function rightAnswer() {
	const state = this.captcha;
	const { storyIdx, runCount, earnings, wordIdx } = state;
	const winAmount = (runCount+1) * (storyIdx+1);
	const filterSettings = FILTER[runCount] ?? {};
	const wordLastIdx = STORY[storyIdx].length;
	
	// Special case, first paragraph is free.
	if (storyIdx === 0 && (wordIdx+1) === wordLastIdx) {
		state.storyIdx += 1;
	}
	
	// Update the session run count.
	state.runCount += 1;
	// Update the total earned
	state.earnings += winAmount;
	// Move to the next word
	state.wordIdx = (wordIdx + wordLastIdx + 1) % wordLastIdx;
	
	// Update the player's cash.	
	this.money += winAmount;
	
	const scene = {
		isChoiceOpen: true,
		dialogs: [
			`Central Office offers a bonus of x${(storyIdx+1)}\nCaptcha was rated for ${(runCount+1)}`,
			`${winAmount} Earned`,
		],
		choices: [
			['Next', runCaptcha],
			['End for the Day', cleanup],
		],
	}
	return scene;
}
