import { SCENES } from '../stages.mjs';

export function restoreProgress() {
	const { wifeParts } = this;
	const partNames = Object.keys(wifeParts);
	const numberOfParts = partNames.reduce((acc, name) => acc + wifeParts[name], 0);
	const partStatus = partNames.map(text => {
		const hasPart = wifeParts[text] > 0;
		if (hasPart) {
			return `We have ${text}.`;
		} else {
			return `Still Missing: ${text}`;
		}
	});
	
	return {
		dialogs: [
			'I need every part to bring my Wife back',
			...partStatus,
			`I have ${numberOfParts} Wife parts so far.\nI still need ${partNames.length-numberOfParts} more parts to bring her back.`,
		],
	};
}