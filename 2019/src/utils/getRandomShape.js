import { SHAPES, EXCLUDE_FROM_RANDOM } from '../consts/shapes.js';
const SHAPE_LIST = Object.keys(SHAPES).filter(icon => !EXCLUDE_FROM_RANDOM.includes(icon));

export const getRandomShape = (shapeList = SHAPE_LIST) => {
  return shapeList[THREE.Math.randInt(0, shapeList.length-1)];
};
