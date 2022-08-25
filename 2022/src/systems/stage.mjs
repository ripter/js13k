// import { ctx, clearScreen } from '../canvas.mjs';
import { getEntities, addEntity, removeEntity, clearEntities, Entity } from '../entities.mjs';

/**
 * Stage System Generator.
 * Manages the active Stage.
 */
export function* StageGen(stages) {
	let isRunning = true;
	// yield; // Setup done, wait for first real call.
	
	while (isRunning) {
		const { delta } = yield;
		
		// Clear the old, re-draw everything fresh because we are a jam and don't need to care about performance yet.
		// This is probably not the correct place, but GAME JAM, so until I have need, it stays here.
		// clearScreen();
		
		// Look for stages to load
		const loadStageEnts= getEntities('load-stage');
		// Load the Stage
		if (loadStageEnts.length > 0) {
			const stageEnt = loadStageEnts[0];
			const stageName = stageEnt['load-stage'];
			console.log('Load the stage', stageName);	
			// remove the loading entity.
			removeEntity(stageEnt);
			loadStage(stages[stageName]);
		}
		
	}
}

function loadStage(config) {
	console.log('Loading Stage', config);	
	// Reset the Entities
	clearEntities();
	// Reset the SVG
	
	
	// Load the Entities for this stage.
	for (let entity of config.entities) {
		addEntity(entity);
	}
}