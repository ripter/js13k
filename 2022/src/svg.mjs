/**
 * References/Functions to work with the SVG
 */
export const svg = window.Stage;

export const elmDialog = svg.getElementById('dialog');
export const elmDialogText = svg.getElementById('dialog-text');
export const elmUIMoneyText = svg.getElementById('ui-money-text');

export const elmUIChoice = svg.getElementById('ui-choice');

export const elmIconMC = svg.getElementById('icon-mc');


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

export function updateChoiceUI(isOpen, choices) {
  if (isOpen) {
    showElm(elmUIChoice);
    for (let i=1; i < 5; i++) {
      const elmChoice = svg.getElementById(`choice-${i}`); 
      const elmText = svg.getElementById(`choice-${i}-text`); 
      const text = choices[i-1];
      console.log(text, elmText);
      
      if (text) {
        showElm(elmChoice);
        elmText.innerHTML = text;
      } else {
        hideElm(elmChoice);
      }
    }
  }
  else {
    hideElm(elmUIChoice); 
  }
}


// hides the element.
export function hideElm(elm) {
  elm.style.visibility = 'hidden';
}

// shows the element.
export function showElm(elm) {
  elm.style.visibility = 'visible';
}