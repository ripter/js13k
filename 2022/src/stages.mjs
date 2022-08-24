import { Entity } from './entities.mjs';

// [
//     'Home',
//     'Ouside Home',
//     'Train Station',
//     'Untaingled',
//     'Cleaning',
//     'Sorting',
//   ]
	
export const STAGES = {
	HOME: {
		title: 'Home',
		background: '',
		entities: [
			new Entity({player: true}),
		],
		paths: [],
	},
	TRAIN: {
		title: 'Train',
		background: '',
		entities: [
			new Entity({
				player: true,
				position: {x: 10, y: 10},
			}),
		],
		paths: [],
	},
};