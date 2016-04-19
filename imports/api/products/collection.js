import { Mongo } from 'meteor/mongo';
import productSchema from './schema.js';

const products = new Mongo.Collection('products');
products.attachSchema(productSchema);

products.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default products;
