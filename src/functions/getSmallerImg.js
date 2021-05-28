import createImage from './createImage';

export default async function getSmallerImage(imageSrc) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width / 2;
  canvas.height = image.height / 2;

  ctx.drawImage(
    image,
    0,
    0,
    image.width / 2,
    image.height / 2,
  );

  return canvas.toDataURL('image/jpeg');
}
