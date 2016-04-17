/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import recommendedProducts from '../collection.js';

Meteor.publish('recommendedProducts.all', function recommendedProductsAll() {
  return recommendedProducts.find();
});
