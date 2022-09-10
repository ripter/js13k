import { SCENES } from '../stages.mjs';
import { createCaptcha } from '../gameCaptcha/createCaptcha.mjs';

// Runs the Captcha game by creating a new Scene for each round.
export function captchaGame(doneIdx) {
	const { 
		captchaIdx = 0, 
		showCaptchaIntro = true 
	} = this;
	const { text, options, settings } = createCaptcha.call(this);
	//
	// Create the scene	
	const scene = {
		isChoiceOpen: true,
		captcha: settings,
		dialogs: [
			text,
		],
		choices: options.reduce((acc, label) => {
			// if this is the right answer
			if (label === text) {
				acc[label] = [rightAnswer, doneIdx];
			}
			// else this is the wrong answer
			else {
				acc[label] = [wrongAnswer, doneIdx];
			}
			
			return acc;
		}, {}),
	};
	return scene;
}


// Clears the captcha filter.
export function cleanup(doneIdx) {
	// updateCaptchaLevel(0);
	// Show the intro the next game.
	// this.showCaptchaIntro = true;
	return SCENES[doneIdx];
}

// Returns the scene on a successful captcha answer.
export function rightAnswer(doneIdx) {
	this.captchaIdx = this.captchaIdx ? this.captchaIdx + 1 : 1;
	const winAmount = this.captchaIdx;
	this.money += winAmount;
	
	const scene = {
		isChoiceOpen: true,
		dialogs: [
			`Successful Session\nYou earn ${winAmount}`,
		],
		choices: {
			'Next': [captchaGame, doneIdx],
			'End for the Day': doneIdx,
		}
	}
	return scene;
}

export function wrongAnswer(doneIdx) {
	this.captchaIdx = this.captchaIdx ? this.captchaIdx + 1 : 1;
	
	return {
		isChoiceOpen: true,
		dialogs: [
			"Falure. Time to go home for the night.\n F",
		],
		choices: {
			'End for the Day': [cleanup, doneIdx],
		}
	};
}
