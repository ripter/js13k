import { getEntities } from '../entities.mjs';
import { lerp } from '../math.mjs'

/**
 * Animates Entities
 */
export function* AnimationGen() {
	let isRunning = true;

	while (isRunning) {
		const { delta } = yield;
		const animationEnts = getEntities('animations');
		// bail if there are no animations
		if (animationEnts.length === 0) continue;	
		// Run the first animation for each Entity.
		for (let entity of animationEnts) {
			// delete the component when out of animations.
			if (entity.animations.length === 0) {
				delete entity.animations;
				break;
			}
			// The active animation is the first one.
			const anim = entity.animations[0];
			// first time playing the animation, use the existing position as the from.
			// this makes chaining animations easier.
			if (!('currentTime' in anim)) {
				anim.currentTime = 0;
				anim.from = {...entity.position};	 // shallow clone
			}
			
			// update the positions
			entity.position.x = lerp(anim.from.x, anim.to.x, anim.currentTime/anim.duration);
			entity.position.y = lerp(anim.from.y, anim.to.y, anim.currentTime/anim.duration);
			
			// Update the time
			anim.currentTime += delta;
			
			// check for end of animation
			if (anim.currentTime > anim.duration) {
				entity.animations.splice(0, 1);
				console.log('animation finished', anim)
			}
			
		}	
	}
}

