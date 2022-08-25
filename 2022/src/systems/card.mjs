import { getEntities } from '../entities.mjs';
import { cardElm } from '../svg.mjs';
// import { ctx } from '../canvas.mjs';

const PADDING = 4;

/**
 * Handles Card entities.
 */
export function* CardGen() {
	let isRunning = true;
	// yield;	
	
	while(isRunning) {
		const { delta } = yield;
		const cardEnts = getEntities('card');
		// bail if there are no cards.
		if (cardEnts.length === 0) continue;
		
		// Draw the Card	
		for (let cardEnt of cardEnts) {
			const { position } = cardEnt;
			const { font, fontSize, text, textColor, boxColor } = cardEnt.card;
			const boxSize = [
				position.x - PADDING, 
				position.y - fontSize - PADDING, 
				(text.length * fontSize) - PADDING, // not perfect, but close enough for now. 
				fontSize + (2.5*PADDING),	
			];
			
			// Set the Card Text.
			const textElm = cardElm.querySelector('text');
			textElm.innerHTML= text;
			
			// Position the Card.
			// cardElm.style = 'matrix(1, 0, 0, 1, 5.713111, -0.637433)';
			// Use the SVG transform attribute
			console.log(`matrix(1, 0, 0, 1, ${position.x} ${position.y})`)
			cardElm.setAttribute('transform', `matrix(1, 0, 0, 1, ${position.x} ${position.y})`);
			
			/*
			// Draw the Box.
			ctx.fillStyle = boxColor
			ctx.fillRect.apply(ctx, boxSize);
			
			// Draw the Text
			ctx.font = `${fontSize}px ${font}`;
			ctx.fillStyle = textColor;
			ctx.fillText(text, position.x, position.y);
			*/
		}
		
	}
}