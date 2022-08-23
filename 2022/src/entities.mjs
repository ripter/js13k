window.ENTITES = [];


// Allows accessing Map keys as object properties.
// obj.name = 'Chris' // does obj.set('name', 'Chris')
// 'name' in obj // return true if 'name' is a key in the Map.
const mapProxyHandler = {
	set(map, prop, value) {
		map.set(prop, value);
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


// Entity extends Map with a Proxy.
// Access keys with the object syntax with Map performance and Safety.
export class Entity extends Map {
	constructor(componentProps) {
		// Map uses a nested array, [[key, value], ...]
		// Entity takes an Object and converts it to the nested array.
		const mapProps = Object.keys(componentProps).reduce((acc, prop) => {
			acc.push([prop, componentProps[prop]]);
			return acc;
		}, []);
		super(mapProps);
		// Proxy allows unset properties to be stored as Key/Value pairs
		// on the Map object.
		return new Proxy(this, mapProxyHandler);
	}
}



export function addEntity(ent) {
	window.ENTITES.push(ent);	
}
