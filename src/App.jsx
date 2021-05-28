import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.module.scss';
import AppProvider from './context/AppProvider';
import Header from './components/Header/Header';
import AppRoutes from './AppRoutes';
import ErrorHandler from './components/ErrorHandler';

function App() {
  const [step, setStep] = useState('1');
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageType, setImageType] = useState('image/jpeg');
  const [errorText, setErrorText] = useState('');
  const [isError, setIsError] = useState(false);

  const contextValue = {
    step,
    setStep,
    errorText,
    setErrorText,
    success,
    setSuccess,
    image,
    setImage,
    croppedImage,
    setCroppedImage,
    imageType,
    setImageType,
    isError,
    setIsError,
  };
  return (
    <div className="App">
      <AppProvider value={contextValue}>
        <Router>
          <ErrorHandler />
          <Header />
          <AppRoutes />
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
