import { SHAPES } from '../consts/shapes.js';
const SHAPE_LIST = Object.keys(SHAPES);

export const getRandomShape = (shapeList = SHAPE_LIST) => {
  return shapeList[THREE.Math.randInt(0, shapeList.length-1)];
};
