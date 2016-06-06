import { Mongo, _, Meteor } from '../../utility/meteor/packages';

const helpers = {};
const cart = new Mongo.Collection(null, {
  transform(doc) {
    return _.extend(doc, helpers);
  },
});

helpers.disable = function disble() {
  cart.update({ _id: this._id }, { $set: { enabled: false } });
};

helpers.enable = function enable() {
  cart.update({ _id: this._id }, { $set: { enabled: true } });
};

cart.clearAndSetProducts = function setProducts(products) {
  this.remove({});
  if (!_.isEmpty(products) && _.isArray(products)) {
    const variationName = Meteor.settings.public.products.variationName;
    const variationKey = Meteor.settings.public.products.variationKey;
    products.forEach((product) => {
      const variation = product[variationName];
      const defaultVariationId = variation[0][variationKey];
      this.insert({
        productId: product._id,
        variationId: defaultVariationId,
        singlePrice: product.price,
        quantity: 1,
        enabled: true,
      });
    });
  }
};

cart.addProduct = function addProduct(
    productId, variationId, price, quantity = 1) {
  if (productId && variationId && price) {
    const existingProduct = this.findOne({ variationId });
    if (existingProduct) {
      this.update({ _id: existingProduct._id }, { $inc: { quantity } });
    } else {
      this.insert({
        productId,
        variationId,
        singlePrice: price,
        quantity,
        enabled: true,
      });
    }
  }
};

cart.totalItems = function totalItems() {
  let itemCount = 0;
  this.find().forEach((product) => {
    itemCount += product.quantity;
  });
  return itemCount;
};

cart.totalPrice = function totalPrice() {
  let price = 0;
  this.find().forEach((product) => {
    price += product.singlePrice;
  });
  return price;
};

export default cart;
