import React, { useContext, useMemo } from 'react';
import styles from './Header.module.scss';
import AppContext from '../../context/AppContext';

const Header = () => {
  const { step } = useContext(AppContext);

  const firstStepElement = step === '1'
    ? (
      <div className={`${styles.step} ${styles.active}`}>
        <div className={styles.stepWrapper}>1</div>
        <p>Choose your photo</p>
      </div>
    )
    : (
      <div className={styles.step}>
        <div className={styles.stepWrapper}>1</div>
      </div>
    );

  const secondStepElement = step === '2'
    ? (
      <div className={`${styles.step} ${styles.active}`}>
        <div className={styles.stepWrapper}>2</div>
        <p>Crop it!</p>
      </div>
    )
    : (
      <div className={styles.step}>
        <div className={styles.stepWrapper}>2</div>
      </div>
    );

  const thirdStepElement = step === '3'
    ? (
      <div className={`${styles.step} ${styles.active}`}>
        <div className={styles.stepWrapper}>3</div>
        <p>Enjoy amazing result</p>
      </div>
    )
    : (
      <div className={styles.step}>
        <div className={styles.stepWrapper}>3</div>
      </div>
    );

  return useMemo(() => (
    <header className={styles.header} id="header">
      <div className={styles.contentContainer}>
        <div className={styles.logo}>
          <div className={styles.img} />
          <span>TASK 5 LOGOTYPE</span>
        </div>

        <div className={styles.stepContainer}>
          {firstStepElement}
          {secondStepElement}
          {thirdStepElement}
        </div>
      </div>
    </header>
  ), [step]);
};

export default Header;
