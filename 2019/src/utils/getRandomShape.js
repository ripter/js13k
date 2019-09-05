import { SHAPES } from '../consts/shapes.js';
import { SHAPES_PREMIUM } from '../consts/shapes-premium.js';
let list;


// Paying users get premium toys, just like in real life.
if(false){//document.monetization && document.monetization.state === 'started') {
  list = Object.keys(SHAPES_PREMIUM);
}
else {
  list = Object.keys(SHAPES);
}

export const getRandomShape = (shapeList = list) => {
  return shapeList[THREE.Math.randInt(0, shapeList.length-1)];
};
