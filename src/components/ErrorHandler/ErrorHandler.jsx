import React, { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import styles from './ErrorHandler.module.scss';
import AppContext from '../../context/AppContext';

const ErrorHandler = () => {
  const {
    errorText, setErrorText, setIsError, isError, success, setSuccess,
  } = useContext(AppContext);

  useEffect(() => {
    if (errorText !== '') {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorText('');
      }, 1000);
    }
  }, [errorText, success]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }
  }, [errorText, success]);

  const errorHandlerClassName = classNames(
    styles.errorHandler,
    { [styles.show]: isError },
    { [styles.success]: success },
  );

  return useMemo(() => (
    <div className={errorHandlerClassName}>
      <p>{errorText}</p>
    </div>
  ), [errorText, isError, success]);
};

export default ErrorHandler;
