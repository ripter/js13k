import { STORY, nextRandom } from './const.mjs';
import { randomizeText } from './randomizeText.mjs';

export function createCaptcha() {
	const { humanFriendHelp = 0, captchaRoundIdx = 0 } = this;
	let captchaIdx = this.captchaIdx >= STORY[humanFriendHelp].length ? this.captchaIdx : 0;
	const storyLine = STORY[humanFriendHelp];
	const hintWord = storyLine[captchaIdx];
	const options = [
		randomizeText(hintWord),
		randomizeText(nextRandom()),
		randomizeText(nextRandom()),
		randomizeText(nextRandom()),
	].sort(() => Math.random() - 0.5);
	const targetWord = options[0];
	options.sort(() => Math.random() - 0.5);
	
	// update state
	this.captchaIdx = captchaIdx;
	
	// Return next captcha	
	return {
		text: targetWord, 
		options,
		settings: {
			feTurbulence: ['baseFrequency', '0.1']
		}
	};
}