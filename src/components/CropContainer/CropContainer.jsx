import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Slider, StylesProvider } from '@material-ui/core';
import Cropper from 'react-easy-crop';
import styles from './CropContainer.module.scss';
import AppContext from '../../context/AppContext';
import getCroppedImg from '../../functions/cropImage';
import getResizeImg from '../../functions/resizeImage';

const CropContainer = () => {
  const history = useHistory();

  const {
    // eslint-disable-next-line no-unused-vars
    image, setCroppedImage, setSuccess, setStep, imageType,
  } = useContext(AppContext);

  if (!image) {
    history.push('/');
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [usersCroppedAreaPixels, setUsersCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setUsersCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const goHome = () => {
    setSuccess(false);
    history.push('/');
    setStep('1');
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImageIn = await getCroppedImg(
        image,
        usersCroppedAreaPixels,
        rotation,
      );

      const resizeCroppedImage = await getResizeImg(croppedImageIn, imageType);
      setCroppedImage(resizeCroppedImage);
      history.push('/result');
      setStep('3');
    } catch (e) {
      console.error(e);
    }
  }, [usersCroppedAreaPixels, rotation]);

  return (
    <StylesProvider injectFirst>
      <div className={styles.cropContainer}>
        <div className={styles.simpleBlock}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={3 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            cropSize={{ width: 300, height: 300 }}
          />

          <div className={styles.controls}>
            <div className={styles.wrapper}>
              <p>Scale</p>
              <div className={styles.sliderWrapper}>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                    /* eslint-disable-next-line no-shadow */
                  onChange={(e, zoom) => setZoom(zoom)}
                  classes={{ root: styles.slider, thumb: styles.thumb }}
                />
              </div>
            </div>

            <div className={styles.wrapper}>
              <p>Rotate</p>
              <div className={styles.sliderWrapper}>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  aria-labelledby="Rotation"
                  classes={{ root: styles.slider, thumb: styles.thumb }}
                    /* eslint-disable-next-line no-shadow */
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <Button classes={{ root: styles.button }} onClick={goHome}>Change</Button>
              <Button classes={{ root: styles.button }} onClick={showCroppedImage}>Accept</Button>
            </div>

          </div>
        </div>
      </div>
    </StylesProvider>
  );
};

export default CropContainer;
