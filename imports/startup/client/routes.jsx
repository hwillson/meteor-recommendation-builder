import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import BuildContainer from '/imports/ui/customer/containers/BuildContainer.jsx';
import AdminContainer from '/imports/ui/admin/containers/AdminContainer.jsx';
import ProductsContainer from '/imports/ui/admin/containers/ProductsContainer.jsx';
import SettingsContainer from '/imports/ui/admin/containers/SettingsContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/build/" component={BuildContainer} />
    <Route path="/admin/" component={AdminContainer}>
      <Route path="products" component={ProductsContainer} />
      <Route path="settings" component={SettingsContainer} />
    </Route>
  </Router>
);
