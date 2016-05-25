import React from 'react';
import { Redirect, Router, Route, browserHistory } from 'react-router';

import { BuilderContainer } from '../../ui/builder/containers/BuilderContainer';
import { ProductsContainer } from '../../ui/builder/containers/ProductsContainer';

import WelcomePage from '../../ui/builder/pages/WelcomePage';
import QuestionsPage from '../../ui/builder/pages/QuestionsPage';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="builder/welcome" />
    <Route path="builder/" component={BuilderContainer}>
      <Route path="welcome" component={WelcomePage} />
      <Route path="questions" component={QuestionsPage} />
      <Route path="products" component={ProductsContainer} />
    </Route>
  </Router>
);
