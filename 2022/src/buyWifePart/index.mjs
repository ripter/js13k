import { buyPart } from './buyPart.mjs';

const PRICES = 	{
	'Neural Link': 1000,
	'Torso': 1000,
	'Arms': 500,
	'Legs': 500,
};


export function buyWifePart() {
	const { wifeParts } = this;
	const partNames = Object.keys(wifeParts);
	
	const missingParts = partNames.reduce((acc, name) => {
		if (wifeParts[name] === 0) {
			acc.push([`${name} for 🤖 ${PRICES[name]}`, buyPart]);
		}	
		return acc;
	}, []);
	
	return {
		dialogs: [
			'Spend money to buy a Wife Part.\nWith all the parts, I can bring her back.',
		],
		choices: missingParts,
	}
}