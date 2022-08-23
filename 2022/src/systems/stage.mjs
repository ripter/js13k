import { ctx, clearScreen } from '../canvas.mjs';

/**
 * Stage System Generator.
 * Manages the active Stage and handles transitions.
 */
export function* StageGen(stages) {
	let currentStage = 0;
	let isRunning = true;
	let delay = 0;
	console.log('StageGen setup', stages)
	// Setup code
	yield;
	
	while(isRunning) {
		const { delta } = yield;
		delay += delta;
		if (delay < 1) continue;
		delay = 0;
		currentStage += 1;
		if (currentStage >= stages.length) {
			currentStage = 0;
		}
		
		// Clear the old, re-draw everything fresh because we are a jam and don't need to care about performance yet.
		clearScreen();
		ctx.fillStyle = 'red';
		ctx.strokeStyle = 'blue';	
		
		ctx.font = '10px jost';
		ctx.fillText(stages[currentStage], 10, 10);
	}
	
}