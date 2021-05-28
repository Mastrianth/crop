import React, { useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';

import styles from './DropImages.module.scss';
import { ReactComponent as PhotohraphiesIco } from '../../assets/img/photographys.svg';
import validateImage from '../../functions/validateImage';
import AppContext from '../../context/AppContext';

const DropImages = () => {
  const {
    setErrorText, isError, success, setSuccess, setImage, setStep, setImageType,
  } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    if (success) {
      history.push('/crop');
      setStep('2');
    }
  });

  const onDrop = useCallback((acceptedFiles) => {
    validateImage(acceptedFiles, setErrorText, setSuccess, setImage, setImageType);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const svgContainerStyles = classNames(
    styles.svgContainer,
    { [styles.error]: isError },
    { [styles.onDrug]: !isDragActive },
    { [styles.success]: success },
  );

  return (
    <div className={styles.dropImages}>
      <div className={styles.contentContainer}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <div className={svgContainerStyles} {...getRootProps()}>
          <PhotohraphiesIco />
          <h2>Drag your photo here</h2>
          <span>or</span>
          <label htmlFor="file" className={styles.label}>
            CLICK AND SELECT A PHOTO FROM YOUR DEVICE
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input type="file" name="file" id="file" {...getInputProps()} accept=".png, .jpg, .jpeg" />
          </label>
          <span className={styles.support}>
            Minimum size of 300x300 .jpg, .jpeg, .png up to 5 MB
          </span>
        </div>
      </div>
    </div>
  );
};

export default DropImages;
