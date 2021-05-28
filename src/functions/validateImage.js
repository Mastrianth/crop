const validateImage = (file, setErrorText, setSuccess, setImage, setImageType) => {
  const URL = window.URL || window.webkitURL;
  const img = new Image();
  if (file[file.length - 1]) {
    setImageType(file[file.length - 1].type);

    const objectUrl = URL.createObjectURL(file[file.length - 1]);

    img.onload = function () {
      if ((!(/.jpg$|.jpeg$|.png$/.test(file[file.length - 1].name)))) {
        setErrorText('The App only supports .jpg, .jpeg and .png files.');
      } else if (this.width < 300 || this.height < 300) {
        setErrorText('Width and height of image must be more then 300px');
      } else if (file[file.length - 1].size > 5242880) {
        setErrorText('File size must be up to 5 MB');
      } else {
        setErrorText('');
        setSuccess(true);

        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        c.width = this.naturalWidth;
        c.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0);

        setImage(c.toDataURL());
      }
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  }
  setErrorText('Something gone wrong...');
};

export default validateImage;
