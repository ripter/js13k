import { showElm } from './svg/showElm.mjs';
import { hideElm } from './svg/hideElm.mjs';

/**
 * References/Functions to work with the SVG
 */
export const svg = window.Stage;

export const elmDialog = svg.querySelector('#dialog');
export const elmDialogText = svg.querySelector('#dialog-text');
export const elmUIMoneyText = svg.querySelector('#ui-money-text');


export const filterCaptchaDisplacement = svg.querySelector('#captcha1 feDisplacementMap');
export const filterCaptchaTurbulence = svg.querySelector('#captcha1 feTurbulence');


// Updates the Dialog SVG
export function updateDialog(isOpen, text) {
  if (isOpen) {
    showElm(elmDialog);
    elmDialogText.innerHTML = text.replaceAll(/\n/g, '<tspan x="67.72200012207031" dy="1em">​</tspan>');
  } 
  else {
    hideElm(elmDialog);
  }
}


// Shows the visible items and hides all other items.
export function updateItems(visibleItems) {
  const itemIds = Object.keys(visibleItems);
  // Hide all the items.
  svg.querySelectorAll('.item').forEach(elm => {
    hideElm(elm);
  }); 
  // Show the visible items. 
  itemIds.forEach(id => {
    const elm = svg.getElementById(id)
    if (!elm) return;
    showElm(elm);
  });
}


export function updateUI(money) {
  elmUIMoneyText.innerHTML = ('' + money).padStart(5, 0);
}

