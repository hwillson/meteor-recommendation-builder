import React from 'react';
import { Redirect, Router, Route, browserHistory } from 'react-router';

import AdminContainer from '/imports/ui/admin/containers/AdminContainer.jsx';
import RecommendedProductsContainer
  from '/imports/ui/admin/containers/RecommendedProductsContainer.js';
import SettingsContainer from '/imports/ui/admin/containers/SettingsContainer.jsx';

import BuilderLayout from '/imports/ui/customer/layouts/BuilderLayout.js';
import WelcomePage from '/imports/ui/customer/pages/WelcomePage.js';
import BioPage from '/imports/ui/customer/pages/BioPage.js';
import FeedPage from '/imports/ui/customer/pages/FeedPage.js';
import FinishPage from '/imports/ui/customer/pages/FinishPage.js';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="builder/welcome" />
    <Route path="builder/" component={BuilderLayout}>
      <Route path="welcome" component={WelcomePage} />
      <Route path="bio" component={BioPage} />
      <Route path="feed" component={FeedPage} />
      <Route path="finish" component={FinishPage} />
    </Route>
    <Route path="/admin/" component={AdminContainer}>
      <Route path="recommended-products"
        component={RecommendedProductsContainer}
      />
      <Route path="settings" component={SettingsContainer} />
    </Route>
  </Router>
);
