import { SCENES } from '../stages.mjs';
import { updateCaptchaLevel } from '../svg.mjs';

// Runs the Captcha game by creating a new Scene for each round.
export function captchaGame(doneIdx) {
	const { captchaIdx = 0, showCaptchaIntro = true } = this;
	const { text, options } = CAPTCHA[captchaIdx];
	
	// Add the text to the options
	const choiceOptions = [text, ...options].sort(() => Math.random() - 0.5);
	
	const scene = {
		dialogs: [
			text,
		],
		choices: choiceOptions.reduce((acc, choiceText) => {
			const label = choiceText
				.replaceAll('*', () => 0|Math.random() * 10)
				.replaceAll('#', () => (Math.random() + 1).toString(36).substr(-1));
			// acc[label] = ;
			
			if (choiceText === text) {
				acc[label] = [rightAnswer, doneIdx];
			}
			else {
				acc[label] = -1;
			}
			
			return acc;
		}, {}),
	};

	// updateCaptchaLevel(1);
	
	console.log('captchaGame', this);
	return scene;
}

// Clears the captcha filter.
export function clearCaptcha(doneIdx) {
	updateCaptchaLevel(0);
	// Show the intro the next game.
	this.showCaptchaIntro = true;
	return SCENES[doneIdx];
}

export function rightAnswer(doneIdx) {
	this.captchaIdx = this.captchaIdx ? this.captchaIdx + 1 : 1;
	const winAmount = this.captchaIdx;
	this.money += winAmount;
	
	const scene = {
		dialogs: [
			`Success\nYou earn ${winAmount}`,
		],
		choices: {
			'Next': [captchaGame, doneIdx],
			'End for the Day': doneIdx,
		}
	}
	return scene;
}

/**
 * Captchas 
 */
export const CAPTCHA = [
	{text: 'fOo B4r', options: ['H3ll0 W0rld', 'F** Y*#', 'L337 H83R'], settings: {}},
	{text: 'H3ll0 W0rld', settings: {}},
];