import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import BuildContainer from '/imports/ui/customer/containers/BuildContainer.jsx';
import AdminContainer from '/imports/ui/admin/containers/AdminContainer.jsx';
import RecommendedProductsContainer
  from '/imports/ui/admin/containers/RecommendedProductsContainer.jsx';
import SettingsContainer from '/imports/ui/admin/containers/SettingsContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/build/" component={BuildContainer} />
    <Route path="/admin/" component={AdminContainer}>
      <Route path="recommended-products"
        component={RecommendedProductsContainer}
      />
      <Route path="settings" component={SettingsContainer} />
    </Route>
  </Router>
);
