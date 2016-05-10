/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import recommendedProducts from '../collection.js';

Meteor.publish('recommendedProducts.all', function recommendedProductsAll() {
  let cursor;
  if (this.userId) {
    cursor = recommendedProducts.find();
  } else {
    cursor = this.ready();
  }
  return cursor;
});
