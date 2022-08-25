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
		// title: 'Home',
		background: '',
		entities: [
			// Create an animated title card.
			new Entity({
				card: {text: 'Home', boxColor: '#FFF', textColor: '#000', font: 'jost', fontSize: 20},
				position: {x: 256+8, y: 18}, 
				animations: [
					// slide-in
					{ duration: 2.5, to: {x: 4, y: 18} },
					// slide-up	
					{ duration: 1, to: {x: 4, y: -8} },
				],
			}),
			// Create the player mob.
			new Entity({
				player: true,
				position: {x: 24, y: 28}, 
				mob: {
					bones: [
						{x: 0, y: 0, length: 10, slope: [0, 1]},	
						{x: 0, y: 25, length: 15, slope: [1, 0]},	
						// {x: 0, y: 25, length: 15, slope: 1.5},	
						// {x: 0, y: 25, length: 25, slope: 1, direction: 0},	
						// {x: 0, y: 25, length: 25, slope: 1, direction: 180},	
					],
				},
			}),
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