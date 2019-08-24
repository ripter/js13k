import { SHAPES, EXCLUDE_FROM_RANDOM } from '../shapes.js';
const SHAPE_LIST = Object.keys(SHAPES).filter(icon => !EXCLUDE_FROM_RANDOM.includes(icon));

export const getRandomShape = () => {
  return SHAPE_LIST[THREE.Math.randInt(0, SHAPE_LIST.length-1)];
};
