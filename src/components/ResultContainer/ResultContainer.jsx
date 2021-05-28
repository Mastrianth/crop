import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import styles from './ResultPage.module.scss';
import AppContext from '../../context/AppContext';

const ResultContainer = () => {
  const { croppedImage, setStep, setSuccess } = useContext(AppContext);
  const [blob, setBlob] = useState('');
  const history = useHistory();
  if (!croppedImage) {
    history.push('/');
  }
  const goHome = () => {
    setSuccess(false);
    history.push('/');
    setStep('1');
  };

  if (croppedImage) {
    croppedImage.blob.then((result) => setBlob(result));

    return (
      <div className={styles.resultContainer}>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img src={croppedImage.url} alt="cropped image" width={300} height={300} />
        <h2>Data URL base64</h2>
        <div className={styles.tooltipWrapper}>
          <p>{croppedImage.url}</p>
          <span className={styles.tooltip}>{croppedImage.url}</span>
        </div>

        <h2>Blob image</h2>
        <div>
          <p>{blob}</p>
        </div>

        <Button classes={{ root: styles.button }} onClick={goHome}>BACK HOME</Button>
      </div>
    );
  }
  return <></>;
};

export default ResultContainer;
