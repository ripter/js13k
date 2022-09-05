/**
 * References/Functions to work with the SVG
 */
export const svg = window.Stage;

export const elmDialog = svg.querySelector('#dialog');
export const elmDialogText = svg.querySelector('#dialog-text');

export const elmIconMC = svg.querySelector('#icon-mc');


// Updates the Dialog SVG
export function updateDialog(isOpen, text) {
  let visible = 'hidden';
  
  if (isOpen) {
    visible = 'visible';
    elmDialogText.innerHTML = text.replaceAll(/\n/g, '<tspan x="67.72200012207031" dy="1em">​</tspan>');
  } 
  
  elmDialog.style.visibility = visible;
}


// Shows the visible items and hides all other items.
export function updateItems(visibleItems) {
  const itemIds = Object.keys(visibleItems);
  // Hide all the items.
  svg.querySelectorAll('.item').forEach(elm => {
    elm.style.visibility = 'hidden';
  }); 
  // Show the visible items. 
  itemIds.forEach(id => {
    const elm = svg.getElementById(id)
    if (!elm) return;
    elm.style.visibility = 'visible';
  });
}
