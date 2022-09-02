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
				// card: {text: 'Home', boxColor: '#FFF', textColor: '#000', font: 'jost', fontSize: 20},
				updateCard: {text: 'Home'},
				position: {x: 256+8, y: 0}, 
				animations: [
					// slide-in
					{ duration: 2.5, effect: 'ease-in-out', to: {x: 0, y: 0} },
					// slide-up	
					{ duration: 1, effect: 'ease-in-out', to: {x: 0, y: -50} },
				],
			}),
			// Create the player mob.
			new Entity({
				player: true,
				position: {x: 24, y: 28}, 
				bindTo: '#Player',
			}),
		],
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