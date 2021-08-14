import { byComponents } from '../components/byComponents.mjs';


export function physicsSystem(delta) {
  const entities = byComponents(['movable']);

  entities.forEach(entity => {
    // Apply Deltas
    entity.x += entity.deltaX;
    entity.y += entity.deltaY;

    // clear the deltas
    entity.deltaX = 0;
    entity.deltaY = 0;
  });
}
