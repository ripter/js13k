import { SCENES } from '../stages.mjs';
import { updateCaptchaLevel } from '../svg/updateCaptchaLevel.mjs';
import { randomizeText } from '../gameCaptcha/randomizeText.mjs';
import { CAPTCHA } from '../gameCaptcha/const.mjs';

// Runs the Captcha game by creating a new Scene for each round.
export function captchaGame(doneIdx) {
	const { 
		captchaIdx = 0, 
		showCaptchaIntro = true 
	} = this;
	const { text, options, settings } = CAPTCHA[captchaIdx];
	const labelAnswer = randomizeText(text);
	// Create a list of options with randomization.
	const choiceOptions = [
		labelAnswer,
		...options.map(choiceText => randomizeText(choiceText)),
	].sort(() => Math.random() - 0.5);
	//
	// Create the scene	
	const scene = {
		isChoiceOpen: true,
		captcha: settings,
		dialogs: [
			labelAnswer,
		],
		choices: choiceOptions.reduce((acc, label) => {
			// if this is the right answer
			if (label=== labelAnswer) {
				acc[label] = [rightAnswer, doneIdx];
			}
			// else this is the wrong answer
			else {
				acc[label] = [wrongAnswer, doneIdx];
			}
			
			return acc;
		}, {}),
	};

	// updateCaptchaLevel(1);
	
	console.log('captchaGame', this);
	return scene;
}


// Clears the captcha filter.
export function cleanup(doneIdx) {
	updateCaptchaLevel(0);
	// Show the intro the next game.
	this.showCaptchaIntro = true;
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
			`Success\nYou earn ${winAmount}`,
		],
		choices: {
			'Next': [captchaGame, doneIdx],
			'End for the Day': doneIdx,
		}
	}
	return scene;
}

export function wrongAnswer(doneIdx) {
	
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
