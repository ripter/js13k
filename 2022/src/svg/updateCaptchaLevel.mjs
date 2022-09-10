import { svg } from '../svg.mjs';
export const elmFilter = svg.querySelector('#captcha1');

export function updateCaptchaLevel(settings) {
  svg.querySelectorAll('.captcha-text').forEach(elmText => {
    elmText.style.filter = '';
		
		// No settings just turns off the captcha filter.
		if (!settings) return;
			
		// Settings is an object of selector + setAttribute props (as an array).
		Object.keys(settings).forEach(selector => {
			const elm = elmFilter.querySelector(selector);	
			elm.setAttribute.apply(elm, settings[selector]);
		});
  }); 
}
window.updateCaptchaLevel = updateCaptchaLevel;
