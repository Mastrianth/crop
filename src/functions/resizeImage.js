import createImage from './createImage';

export default async function getResizeImg(imageSrc, imageType) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 300;

  ctx.drawImage(
    image,
    0,
    0,
    300,
    300,
  );

  const url = canvas.toDataURL(imageType);
  const blob = new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, imageType);
  }).then((result) => result);

  return { url, blob };
}
