import createImage from './createImage';
import getSmallerImage from './getSmallerImg';
import getRadianAngle from './getRadianAngle';

export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  let image = await createImage(imageSrc);
  let {
    width, height, x, y,
  } = pixelCrop;

  if (image.width > 2500 || image.height > 2500) {
    const smallerImage = await getSmallerImage(imageSrc);
    image = await createImage(smallerImage);
    width /= 2;
    height /= 2;
    x /= 2;
    y /= 2;
  }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = width;
  canvas.height = height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - y),
  );

  return canvas.toDataURL('image/jpeg');
}
