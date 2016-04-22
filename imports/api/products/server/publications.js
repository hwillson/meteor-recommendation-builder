/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import products from '../collection.js';

Meteor.publish('products.all', function productsAll() {
  let cursor;
  if (this.userId) {
    cursor = products.find();
  } else {
    cursor = this.ready();
  }
  return cursor;
});
