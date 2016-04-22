import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import RecommendedProductsPage from '../pages/RecommendedProductsPage.jsx';
import recommendedProducts
  from '/imports/api/recommended_products/collection.js';

export default createContainer(() => {
  const productsHandle = Meteor.subscribe('recommendedProducts.all');
  const loading = !productsHandle.ready();
  const products = recommendedProducts.find().fetch();
  const productsExist = !loading && !!products;
  return {
    loading,
    products,
    productsExist,
  };
}, RecommendedProductsPage);
