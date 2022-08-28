/**
 * References/Functions to work with the stage's SVG
 */
 
export const svg = window.stage;
export const cardElm = document.getElementById('Card');


// For now, we'll place the callback here. We an always move it later.
const SVGEventHandler = {
  handleEvent(evt) {
    const { target } = evt;
    const { entity } = target;
    const { animations } = entity;
    
    // if there are no animations, bail. Something is out of sync.
    if (animations.length === 0) return;
    // the first animation should always be the active one, make sure it's marked as playing. 
    const anim = animations[0];
    if (!anim.isPlaying) return;
    // Remove the animation so the next one can play.
    entity.animations.splice(0, 1);
    // Remove the entity reference.
    delete target.entity;
  }
};


cardElm.addEventListener('transitionend', SVGEventHandler);