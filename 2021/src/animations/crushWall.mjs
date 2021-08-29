import { genFrameAnimation } from './genFrameAnimation.mjs';

export function* crushWallAnimation() {
  const generator = genFrameAnimation(18, 0.25, (props) => {
    console.log('callback', props);
    const { entity, frame } = props;
    switch (frame) {
      case 0:
        entity.components.add('sprite');
        entity.color = 'dark_gray';
        break;
      case 1:
        entity.color = 'light_gray';
        break;
      case 2:
        entity.color = 'green';
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        entity.x -= 8;
        break;
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        entity.x += 8;
        entity.color = 'light_gray';
        break;
      case 16:
        entity.color = 'dark_gray';
        break;
      case 17:
        entity.components.delete('sprite');
        break;
      default:
      // do nothing.
    }
  });
  // first call is init.
  var { value, done } = generator.next();

  console.log('crusWall value', value, 'done', done);


  // Run the Generator
  // yield* generator;
  let props = yield;
  while (!done) {
    var { value, done } = generator.next(props);
    console.log('while(!done)', 'value', value, 'done', done);
    // yield* generator;
    props = yield;
    console.log('props', props);
  }

}
