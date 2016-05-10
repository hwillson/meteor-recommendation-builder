import React from 'react';
import { Redirect, Router, Route, browserHistory } from 'react-router';

import AdminContainer from '/imports/ui/admin/containers/AdminContainer.jsx';
import RecommendedProductsContainer
  from '/imports/ui/admin/containers/RecommendedProductsContainer.js';
import SettingsContainer from '/imports/ui/admin/containers/SettingsContainer.jsx';

import BuilderLayout from '/imports/ui/builder/layouts/BuilderLayout.js';
import WelcomePage from '/imports/ui/builder/pages/WelcomePage.js';
import QuestionsPage from '/imports/ui/builder/pages/QuestionsPage.js';
import ReviewPage from '/imports/ui/builder/pages/ReviewPage.js';
import ProductsPage from '/imports/ui/builder/pages/ProductsPage.js';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="builder/welcome" />
    <Route path="builder/" component={BuilderLayout}>
      <Route path="welcome" component={WelcomePage} />
      <Route path="questions" component={QuestionsPage} />
      <Route path="review" component={ReviewPage} />
      <Route path="products" component={ProductsPage} />
    </Route>
    <Route path="/admin/" component={AdminContainer}>
      <Route path="recommended-products"
        component={RecommendedProductsContainer}
      />
      <Route path="settings" component={SettingsContainer} />
    </Route>
  </Router>
);
