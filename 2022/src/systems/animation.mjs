import { getEntities } from '../entities.mjs';
import { cardElm } from '../svg.mjs';

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
				continue;
			}
			// The active animation is the first one.
			const anim = entity.animations[0];
			const {effect, duration, to, isPlaying = false } = anim;
			// if the animation is playing, we can bail.
			if (isPlaying) continue;
			
			console.log('entity', entity, 'anim', anim);
			
			// Mark it as playing.
			anim.isPlaying = true;
			// Set a reference so the event can find this entity again.
			cardElm.entity = entity;
			// Set the animation styles.
			cardElm.style.transitionTimingFunction = effect;
			cardElm.style.transitionDuration = `${duration}s`;
			// Set the end location.	
			cardElm.style.transform = `translate(${to.x}px, ${to.y}px)`;
		} // entity loop	
	} // generator loop
}

