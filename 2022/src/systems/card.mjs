import { getEntities } from '../entities.mjs';
import { cardElm } from '../svg.mjs';

/**
 * Handles Card entities.
 */
export function* CardGen() {
	let isRunning = true;
	
	while(isRunning) {
		const { delta } = yield;
		const cardEnts = getEntities('updateCard');
		// bail if there are no cards to update.
		if (cardEnts.length === 0) continue;
		// There is only one Card element, anyone else will have to wait.
		const entity = cardEnts[0];	
		const { text } = entity.updateCard;
		const { position } = entity;
		
		// Set the Card Text.
		const textElm = cardElm.querySelector('text');
		textElm.innerHTML= text;
		
		// Set the position using the SVG transform matrix. This moves the group without triggering CSS animations.
		cardElm.setAttribute('transform', `matrix(1, 0, 0, 1, ${position.x}, ${position.y})`);
		
		// All done, remove the component
		delete entity.updateCard;
	}
}