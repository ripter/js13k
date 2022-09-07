import { SCENES } from '../stages.mjs';

export function restoreProgress(progressIdx) {
	const scene = SCENES[progressIdx];
	const { wifeParts } = this;
	const partNames = Object.keys(wifeParts);
	
	scene.dialogs = partNames.map(text => {
		const hasPart = wifeParts[text] > 0;
		if (hasPart) {
			return `We have ${text}.`;
		} else {
			return `Still Missing: ${text}`;
		}
	});
	
	const numberOfParts = partNames.reduce((acc, name) => acc + wifeParts[name], 0);
	scene.dialogs.push(`I have ${numberOfParts} Wife parts so far.\nI still need ${partNames.length-numberOfParts} more parts to bring her back.`);
	
	return progressIdx;
}