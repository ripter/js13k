
// moves back to the previous scene.
// this === state
export function backeOne() {
	return this?.lastSceneIndex ?? 0;	
}