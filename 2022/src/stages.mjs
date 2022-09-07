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
			'Gardening, Captcha Entry, or Investing',
		],
		items: {
			'level-bus': -1,	
			'door-to-garden': 5,
			'door-to-captcha': 6,
			'door-to-investing': 7,
		},
	},
	// 4 - Bus Stop without dialog.
	{
		items: {
			'level-bus': -1,	
			'door-to-garden': 5,
			'door-to-captcha': 6,
			'door-to-investing': 7,
		},
	},
	// 5 - Garden Stop [Intro]
	{
		dialogs: [
			'Gardening is a lot of upfront work.',
			'Payment is not guaranteed.',
			'But the bus ride is free.',
			'Should I spend the day Gardening?',
		],
		choices: {
			'Yes': -1,
			'No': 4,
		},
	},
	// 6 - Captcha Entry [Intro] 
	{
		dialogs: [
			'Captcha Entry',
			'Pays a little for each solved captcha.',
			'But the bus ride costs 10',
			'Should I spend the day entering Captchas?',
		],
		choices: {
			'Yes': -1,
			'No': 4,
		},
	},
	// 7 - Something [Intro] 
	{
		dialogs: [
			'"Investing" \n(aka Gambling)',
			'Risk a little or Risk a lot.',
			'But the bus ride costs 100',
			'Should I spend the day Investing?',
		],
		choices: {
			'Yes': -1,
			'No': 4,
		},
	},
];
	
