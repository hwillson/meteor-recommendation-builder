import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import RecommendedProductsPage from '../pages/RecommendedProductsPage.js';
import recommendedProducts
  from '/imports/api/recommended_products/collection.js';
import questions from '/imports/api/questions/collection.js';

export default createContainer(() => {
  const questionsHandle = Meteor.subscribe('questions.all');
  const productsHandle = Meteor.subscribe('recommendedProducts.all');
  const loading = !questionsHandle.ready() || !productsHandle.ready();
  const loadedQuestions = questions.find().fetch();
  const questionsExist =
    !loading && loadedQuestions && (loadedQuestions.length > 0);
  const products = recommendedProducts.find().fetch();
  const productsExist = !loading && products && (products.length > 0);
  return {
    loading,
    loadedQuestions,
    questionsExist,
    products,
    productsExist,
  };
}, RecommendedProductsPage);

// TODO - make sure questions exist; if not hide everything and show message
// saying questions have to be created first
