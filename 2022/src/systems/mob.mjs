import { ctx } from '../canvas.mjs';
import { getEntities } from '../entities.mjs';

/**
 * Mob Rendering Generator
 * Mob aka Movable Object is a poor choice of name.
 * Sprite, or something else might be better.
 * Maybe Mon, short for Monster? or even better, Pocket Monsters? 
 */
export function* MobGen() {
	let isRunning = true;	
	while (isRunning) {
		const { delta } = yield;
		const entities = getEntities('mob');
		if (entities.length === 0) continue; // bail if there are no entities to update.
		
		for (let entity of entities) {
			const { mob, position } = entity;	
			
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'white';
			// ctx.fillRect(position.x, position.y, 25, 25);
			for (let bone of mob.bones) {
				ctx.beginPath();
				ctx.moveTo(
					position.x + bone.x,
					position.y + bone.y,
				);	
				ctx.lineTo(
					(position.x + bone.x + bone.length) * bone.slope[0],
					(position.y + bone.y + bone.length) * bone.slope[1],
				);
				// ctx.moveTo(position.x, position.y);
				// ctx.lineTo(
				// 	position.x + bone.x,
				// 	position.y + bone.y,
				// );	
				ctx.stroke();
				// ctx.fillRect(
				// 	position.x + bone.x,
				// 	position.y + bone.y,
				// 	bone.length,
				// 	bone.length,
				// )
			}
		}
	}
}