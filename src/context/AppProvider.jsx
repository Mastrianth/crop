import React from 'react';
import AppContext from './AppContext';

// eslint-disable-next-line react/prop-types
const AppProvider = ({ value, children }) => (
  <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
);

export default AppProvider;
