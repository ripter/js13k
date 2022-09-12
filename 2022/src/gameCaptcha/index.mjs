import { STORY, FILTER, nextRandom, randomLove } from './const.mjs';
import { randomizeText } from './randomizeText.mjs';
import { wrongAnswer } from './wrongAnswer.mjs';
import { rightAnswer } from './rightAnswer.mjs';
import { hasLove } from './hasLove.mjs';

// Creates the Captcha Scene
export function runCaptcha() {
	const state = this.captcha;
	const { storyIdx, wordIdx, runCount  } = state;
	const storyLine = STORY[storyIdx];
	const word = storyLine[wordIdx];
	const isHumanTest = (storyIdx > 0) && (runCount > 1) && (Math.random() <= (runCount * 0.0125));
	let targetWord = isHumanTest ? randomizeText(randomLove()) : randomizeText(word);
	
	// Start with a list of random choices.
	// Then turn it into a choice object.
	const choices = [
			randomizeText(nextRandom()),
			randomizeText(nextRandom()),
			randomizeText(nextRandom()),
	].map(text => [text, wrongAnswer])
	// Add the target to the choice list.	
	choices.push([targetWord, rightAnswer]);
	// Randomize the choice order
	choices.sort(() => Math.random() - 0.5);
	
	// Return next captcha scene
	return {
		isChoiceOpen: true,
		captcha: FILTER[runCount] ?? {},
		dialogs: [targetWord],
		choices: choices,
	};
}