/* global Package */

import recommendedProductSchema from './schema.js';

const Mongo = Package.mongo.Mongo;

const recommendedProducts = new Mongo.Collection('recommended_products');
recommendedProducts.attachSchema(recommendedProductSchema);

recommendedProducts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default recommendedProducts;
