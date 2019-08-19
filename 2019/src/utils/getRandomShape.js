import { SHAPES } from '../shapes.js';
const SHAPE_LIST = Object.keys(SHAPES);

export const getRandomShape = () => {
  return SHAPE_LIST[THREE.Math.randInt(0, SHAPE_LIST.length-1)];
};
