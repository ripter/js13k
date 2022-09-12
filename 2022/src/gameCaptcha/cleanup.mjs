import { identity } from '../actions/identity.mjs';

// Cleanup the Captcha game session and return the doneIdx.
export function cleanup() {
	const state = this.captcha;
	const { doneIdx } = state;
	
	// Reset Session data.
	state.earnings = 0;
	state.runCount = 0;
	state.isHumanTest = false;
	
	// Move on to the next non-game scene.
	return identity(doneIdx);
}
