/* global Package */

const Mongo = Package['mongo'].Mongo;

import recommendedProductSchema from './schema.js';

const recommendedProducts = new Mongo.Collection('recommended_products');
recommendedProducts.attachSchema(recommendedProductSchema);

recommendedProducts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default recommendedProducts;
