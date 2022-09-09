/**
 * References/Functions to work with the SVG
 */
export const svg = window.Stage;

export const elmDialog = svg.querySelector('#dialog');
export const elmDialogText = svg.querySelector('#dialog-text');
export const elmUIMoneyText = svg.querySelector('#ui-money-text');

export const elmUIChoice = svg.querySelector('#ui-choice');

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

export function updateChoiceUI(isOpen, choices) {
  if (isOpen) {
    showElm(elmUIChoice);
    for (let i=1; i < 5; i++) {
      const elmChoice = svg.getElementById(`choice-${i}`); 
      const elmText = svg.getElementById(`choice-${i}-text`); 
      const text = choices[i-1];
      
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
    for (let i=1; i < 5; i++) {
      const elmChoice = svg.getElementById(`choice-${i}`); 
      hideElm(elmChoice);
    }
  }
}


export function updateCaptchaLevel(newLevel) {
  svg.querySelectorAll('.captcha-text').forEach(elmText => {
    elmText.style.filter = '';
    
    switch (newLevel) {
      case 0:
        elmText.style.filter = '';
        return;
      case 1: {
        filterCaptchaDisplacement.setAttribute('scale', '0.01');
        filterCaptchaTurbulence.setAttribute('baseFrequency', '0.1');
        elmText.style.filter = 'url("#captcha1")';
        return;
      }
      case 2: {
        filterCaptchaDisplacement.setAttribute('scale', '0.03');
        filterCaptchaTurbulence.setAttribute('baseFrequency', '0.05');
        elmText.style.filter = 'url("#captcha1")';
        return;
      }
      case 3: {
        filterCaptchaDisplacement.setAttribute('scale', '0.05');
        filterCaptchaTurbulence.setAttribute('baseFrequency', '0.1');
        elmText.style.filter = 'url("#captcha1")';
        return;
      }
      default:
        return; 
    }  
  }); 
}
window.updateCaptchaLevel = updateCaptchaLevel;

// filter: url("#captcha1")

// hides the element.
export function hideElm(elm) {
  elm.style.visibility = 'hidden';
}

// shows the element.
export function showElm(elm) {
  elm.style.visibility = 'visible';
}