import React from 'react';
import {
  Switch, Route, useLocation, Redirect,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DropImages from './components/DropImage';
import ResultContainer from './components/ResultContainer';
import CropContainer from './components/CropContainer';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={350}
      >
        <Switch>
          <Route exact path="/crop">
            <CropContainer />
          </Route>
          <Route exact path="/result">
            <ResultContainer />
          </Route>
          <Route exact path="/">
            <DropImages />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AppRoutes;
