import { Mongo, _ } from '../../utility/meteor/packages';

import products from '../products/collection';

const helpers = {};
const cart = new Mongo.Collection(null, {
  transform(doc) {
    return _.extend(doc, helpers);
  },
});

// Model Helpers

helpers.disable = function disble() {
  cart.update({ _id: this._id }, { $set: { enabled: false } });
};

helpers.enable = function enable() {
  cart.update({ _id: this._id }, { $set: { enabled: true } });
};

helpers.increaseQuantity = function increaseQuantity() {
  cart.update({ _id: this._id }, { $inc: { quantity: 1 } });
};

helpers.decreaseQuantity = function decreaseQuantity() {
  if (this.quantity > 1) {
    cart.update({ _id: this._id }, { $inc: { quantity: -1 } });
  }
};

helpers.changeProductVariation = function changeProductVariation(newProductId) {
  if (newProductId) {
    const newProduct = products.findOne({ _id: newProductId });
    newProduct.enabled = true;
    newProduct.quantity = this.quantity;
    cart.insert(newProduct);
    cart.remove({ _id: this._id });
  }
};

// Collection Helpers

cart.clearAndSetProducts = function setProducts(loadedProducts) {
  this.remove({});
  if (!_.isEmpty(loadedProducts) && _.isArray(loadedProducts)) {
    const addedProductIds = [];
    loadedProducts.forEach((product) => {
      if (addedProductIds.indexOf(product.productId) === -1) {
        this.addProduct(product, 1);
        addedProductIds.push(product.productId);
      }
    });
  }
};

cart.addProduct = function addProduct(product, quantity = 1) {
  if (product) {
    const existingProduct = this.findOne({ _id: product._id });
    if (existingProduct) {
      this.update({ _id: product._id }, { $inc: { quantity } });
    } else {
      const newProduct = product;
      newProduct.quantity = quantity;
      newProduct.enabled = true;
      this.insert(newProduct);
    }
  }
};

cart.totalItems = function totalItems() {
  let itemCount = 0;
  this.find({ enabled: true }).forEach((product) => {
    itemCount += product.quantity;
  });
  return itemCount;
};

cart.totalPrice = function totalPrice() {
  let price = 0;
  this.find({ enabled: true }).forEach((product) => {
    price += (product.variationPrice * product.quantity);
  });
  return price;
};

export default cart;
