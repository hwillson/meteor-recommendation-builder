import { Mongo } from '../../utility/meteor/packages.js';

import productSchema from './schema';

const products = new Mongo.Collection('products');
products.attachSchema(productSchema);

products.getVariationsForProduct = function getVariationsForProduct(productId) {
  let variations = [];
  if (productId) {
    variations = this.find({ productId }).fetch();
  }
  return variations;
};

products.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default products;
