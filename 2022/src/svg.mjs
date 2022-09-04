/**
 * References/Functions to work with the SVG
 */
export const svg = window.Stage;

export const elmDialogText = svg.querySelector('#dialog-text');





// const feColorMatrixWaterEffect = document.querySelector('#watereffect feColorMatrix');
// console.log('feColorMatrixWaterEffect', feColorMatrixWaterEffect);

// setInterval(() => {
//   const values = feColorMatrixWaterEffect.getAttribute('values');
//   let val = parseInt(values, 10) + 15; 
//   
//   if (val >= 180) {
//     val = -180;
//   }
//   
//   // console.log('updating value', value);
//   feColorMatrixWaterEffect.setAttribute('values', val);
// }, 300);


/*
 * OLDDER
export const cardElm = document.getElementById('Card');
export const playerElm = document.getElementById('Player');


// For now, we'll place the callback here. We an always move it later.
const SVGEventHandler = {
  handleEvent(evt) {
    const { target, type } = evt;
    
    switch (type) {
      case 'transitionend':
        return endAnimation(target);
      case 'click':
        return clickOnPath(target, evt.x, evt.y);
      default:
        // ignore
    }
  }
};

// Handle ending the animation by updating the component.
function endAnimation(target) {
  const { entity } = target;
  if (!entity) return; // bail if there is no entity on the target.
  const { animations = [] } = entity;
  
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

function clickOnPath(target, x, y) {
  const { entity } = playerElm;
  console.log('Move the Player on the path.', '\n', x, y, '\n', target);  
  // const animations = [
	// 	{ duration: 1, effect: 'ease-in-out', to: {x: x, y: y} },
  // ];
  // entity.grr= animations;
  entity.animations = [
		{ duration: 1, effect: 'ease-in-out', to: {x: x, y: y} },
  ];
}


// Bind events to the SVG elements.
cardElm.addEventListener('transitionend', SVGEventHandler);

document.querySelectorAll('.move-path').forEach(elm => elm.addEventListener('click', SVGEventHandler)); 
*/
