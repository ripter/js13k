import { LETTERS } from '../consts/font.mjs';


// copied from https://github.com/PaulBGD/PixelFont
export function drawText(msg, xPos, yPos, color = '#FFF', size = 1) {
  window.ctx.fillStyle = color;

  let currX = 0;
  for (let xMsgPos = 0; xMsgPos < msg.length; xMsgPos++) {
    const letter = LETTERS[msg[xMsgPos].toUpperCase()];
    
    if (!letter) {
      continue;
    }

    let currY = yPos;
    let addX = 0;
    for (let y = 0; y < letter.length; y++) {
      let row = letter[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          window.ctx.fillRect(xPos + currX + x * size, currY, size, size);
        }
      }
      addX = Math.max(addX, row.length * size);
      currY += size;
    }
    currX += size + addX;
  }
}

/*
export function drawText(msg, x, y, color = '#FFF', font = '10px monospace') {
  window.ctx.fillStyle = color;
  window.ctx.font = font;
  window.ctx.fillText(msg, x, y);
}
*/
