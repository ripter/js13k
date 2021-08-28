import { byComponents } from '../entities/byComponents.mjs';
import { byID } from '../entities/byID.mjs';


export function animationSystem(deltaTime) {
  const animateEntities = byComponents(['animate']);

  for (let animateEntity of animateEntities) {
    const { done } = animateEntity.animate.next({entity: animateEntity, deltaTime});

    if (done) {
      // Clean up the animation.
      animateEntity.components.delete('animate');
    }
  }
}
