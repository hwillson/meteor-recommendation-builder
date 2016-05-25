import { Mongo } from '../../utility/meteor/packages.js';

const products = new Mongo.Collection('products');

products.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default products;
