/* eslint-disable prefer-arrow-callback */

import { Meteor } from '../../../utility/meteor/packages';

import products from '../collection.js';

Meteor.publish('products.all', function productsAll() {
  return products.find();
});

Meteor.publish('products.notRecommended', function productsNotRecommended() {
  let cursor;
  if (this.userId) {
    cursor = products.find({ display: true });
  } else {
    cursor = this.ready();
  }
  return cursor;
});
