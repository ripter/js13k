import { backeOne } from './actions/backOne.mjs';

// [
//     'Home',
//     'Ouside Home',
//     'Train Station',
//     'Untaingled',
//     'Cleaning',
//     'Sorting',
//   ]

export const SCENES = [
	// 0 - Intro Scene
	{ 
		dialogs: [
			'Death is patient.', 
			'Death is patient. I promise dear Wife...',
			'Death is patient. I promise dear Wife.\nI *will* bring you back.',	
			'A JS13k Game By @ripter001\nCreated in 2022',
		],
		items: {
			'level-home': -1,
			'wife-jar': 1,
			'door-to-bus': 3,
		},
	},
	// 1 - Wife Status
	{
		dialogs: [
			'I miss you 我的爱',
			'Ok, what should I do?',
		],
		choices: {
			'Restoration progress': -1,
			'Buy a Wife Part': -1,
			'Say something nice': 2,
		}
	},
	// 2 - Home without Dialog.
	{
		items: {
			'level-home': -1,
			'wife-jar': 1,
			'door-to-bus': 3,
		},
	},
	// 3 - Bus Stop
	{
		dialogs: [
			'Bus Stop.',
			'I only have time for one job a day.',
			'Gardening, Research, Trash, or Music',
		],
		items: {
			'level-bus': -1,	
			'door-to-garden': 4,
			'door-to-collect': -1,
			'door-to-music': -1,
		},
	},
	// 4 - Garden Stop [Intro]
	{
		dialogs: [
			'Gardening is a lot of upfront work.',
			'Payment is not guaranteed.',
			'But the bus ride is free.',
			'Should I spend the day Gardening?',
		],
		choices: {
			'Yes': -1,
			'No': [backeOne],
		},
	},
];
	
