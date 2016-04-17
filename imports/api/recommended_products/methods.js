import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import recommendedProductSchema from './schema.js';
import recommendedProducts from './collection.js';
import throwNotAuthorizedException
  from '/imports/utility/exceptions/not_authorized.js';

const addRecommendedProduct = new ValidatedMethod({
  name: 'recommendedProducts.addRecommendedProduct',
  validate: recommendedProductSchema.validator(),
  run(doc) {
    // if (this.userId) {
      recommendedProducts.insert(doc);
    // } else {
    //   throwNotAuthorizedException(this.name);
    // }
  },
});

const updateGender = new ValidatedMethod({
  name: 'recommendedProducts.updateGender',
  validate: new SimpleSchema({
    productId: { type: String },
    gender: { type: [String] },
  }).validator(),
  run({ productId, gender }) {
    // if (this.userId) {
    recommendedProducts.update({ _id: productId }, {
      $set: { gender },
    });
    // } else {
    //   throwNotAuthorizedException(this.name);
    // }
  },
});

const updateSports = new ValidatedMethod({
  name: 'recommendedProducts.updateSports',
  validate: new SimpleSchema({
    productId: { type: String },
    sports: { type: [String] },
  }).validator(),
  run({ productId, sports }) {
    // if (this.userId) {
    recommendedProducts.update({ _id: productId }, {
      $set: { sports },
    });
    // } else {
    //   throwNotAuthorizedException(this.name);
    // }
  },
});

const updateHours = new ValidatedMethod({
  name: 'recommendedProducts.updateHours',
  validate: new SimpleSchema({
    productId: { type: String },
    hours: { type: [String] },
  }).validator(),
  run({ productId, hours }) {
    // if (this.userId) {
    recommendedProducts.update({ _id: productId }, {
      $set: { hours },
    });
    // } else {
    //   throwNotAuthorizedException(this.name);
    // }
  },
});

export { addRecommendedProduct, updateGender, updateSports, updateHours };
