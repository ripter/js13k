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
    elmDialogText.innerHTML = text.replace(/\n/, '<tspan x="67.72200012207031" dy="1em">​</tspan>');
  } 
  
  elmDialog.style.visibility = visible;
}

