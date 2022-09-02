const ENTITES = [];
window.ENTITES = ENTITES;


export function getEntities(componentName) {
	// Looping to find the entities each time is *slow*
	// We can improve performance later if there is time.
	// because we use add/remove functions, upgrading to a more performant approach should be easier.
	const list = [];
	for (const entity of ENTITES) {
		if (componentName in entity) {
			list.push(entity);
		}
	}	
	return list;
}


// This proxy allows using a Map as if it was a plain object.
// obj.name = 'Chris' // does obj.set('name', 'Chris')
// 'name' in obj // return true if 'name' is a key in the Map.
const mapProxyHandler = {
	set(map, prop, value) {
		//Known Bug: This lets the user set values that can no be read back.
		// 				 : this is because the get checks for Map's native props first.
		return map.set(prop, value);
	},
	get(map, prop, value) {
		// if the prop exists on the native map, then pass it through.
		if (prop in map) {
			// functions need to be bound before returning.
			if (typeof map[prop] === 'function') {
				return map[prop].bind(map);
			}
			return map[prop];
		}
		// return the prop as a key in the map;
		return map.get(prop);
	},
	has(map, prop) {
		return (prop in map) || map.has(prop);
	},
	deleteProperty(map, prop) {
		return map.delete(prop);
	},
};


/**
 * Entities hold Components. That's all folks.
 * Thanks to the power of Proxy, Entity is a Map that can be used as a plain object.
 */
export class Entity extends Map {
	// component props is an object of {componentName: componentValues}
	constructor(componentProps) {
		// Map uses a nested array, [[key, value], ...]
		// Entity takes an Object and converts it to the nested array.
		const mapProps = Object.keys(componentProps).reduce((acc, prop) => {
			acc.push([prop, componentProps[prop]]);
			return acc;
		}, []);
		// Run the native Map setup.
		super(mapProps);
		// Return the Proxied version of ourselves.
		return new Proxy(this, mapProxyHandler);
	}
}


/**
 * Adds an entity to the world.
 */
export function addEntity(entity) {
	ENTITES.push(entity);	
}

/**
 * Removes the entity from the world.
 */
export function removeEntity(entity) {
	const idx = ENTITES.indexOf(entity);
	if (idx === -1) return;
	ENTITES.splice(idx, 1);
}

/**
 * Removes all entities from the world.
 */
export function clearEntities() {
	ENTITES.length = 0;	
}