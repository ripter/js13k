/**
 * Creates and adds imgColor to window.
*/
export function addColorImage(colorID, rgb, shouldInvert = false) {
  const img = window.imgBase;
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, img.width, img.height);

  // adjust the color values for each pixel
  for (let i=0; i < imgData.data.length; i += 4) {
    // Check for non-white pixels
    if (imgData.data[i] < 200 && imgData.data[i+1] < 200 && imgData.data[i+2] < 200) {
      imgData.data[i] = shouldInvert ? rgb[0] : 0;
      imgData.data[i+1] = shouldInvert ? rgb[1] : 0;
      imgData.data[i+2] = shouldInvert ? rgb[2] : 0;
      imgData.data[i+3] = shouldInvert ? 255 : 0;
    }
    // white pixels
    else {
      imgData.data[i] = shouldInvert ? 0 : rgb[0];
      imgData.data[i+1] = shouldInvert ? 0 : rgb[1];
      imgData.data[i+2] = shouldInvert ? 0 : rgb[2];
      imgData.data[i+3] = shouldInvert ? 0 : 255;
    }
  }

  // Draw the adjusted image.
  ctx.clearRect(0, 0, img.width, img.height);
  ctx.putImageData(imgData, 0, 0);

  // Get the dataURL fo the new image.
  const imgSrc = canvas.toDataURL();
  const newImg = document.createElement('img');
  newImg.src = imgSrc;
  newImg.style.display = 'none';
  newImg.id = `img_${colorID}`;
  document.body.append(newImg);
}
