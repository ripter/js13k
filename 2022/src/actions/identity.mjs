import { SCENES } from '../stages.mjs';

// Returns the Scene object from the constant by index
export function identity(nextSceneIdx) {
	return SCENES[nextSceneIdx];
}