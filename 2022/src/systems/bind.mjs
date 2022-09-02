import { getEntities } from '../entities.mjs';

export function* BindGen() {
	let isRunning = true;
	
	while(isRunning) {
		const { delta } = yield;
		// get the entities or bail
		const entities = getEntities('bindTo');	
		if (entities.length === 0) continue;
		
		// Bind the entity to the element
		for (let ent of entities) {
			const { bindTo } = ent;	
			const elm = document.querySelector(bindTo);
			if (!elm) continue;
			// Bind the Entity to the Elm.
			elm.entity = ent;
			// Remove the bind component.
			delete ent.bindTo;
		}
	}
}