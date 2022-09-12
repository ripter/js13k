import { svg } from '../svg.mjs';
import { showElm } from './showElm.mjs';
import { hideElm } from './hideElm.mjs';

export const elmUIChoice = svg.querySelector('#ui-choice');

// Update the SVG Choice Dialog UI.
export function updateChoiceUI(isOpen, choices) {
  if (isOpen) {
    showElm(elmUIChoice);
    for (let i=0; i < 4; i++) {
      const elmChoice = svg.getElementById(`choice-${i}`); 
      const elmText = svg.getElementById(`choice-${i}-text`); 
      const choice = choices[i];
      
      if (choice) {
        showElm(elmChoice);
        elmText.innerHTML = choice[0];
      } else {
        hideElm(elmChoice);
      }
    }
  }
  else {
    hideElm(elmUIChoice); 
    for (let i=0; i < 4; i++) {
      const elmChoice = svg.getElementById(`choice-${i}`); 
      hideElm(elmChoice);
    }
  }
}
