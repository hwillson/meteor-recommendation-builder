import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import recommendedProductSchema from './schema.js';
import recommendedProducts from './collection.js';
import products from '../products/collection.js';
import throwNotAuthorizedException
  from '/imports/utility/exceptions/not_authorized.js';

const addRecommendedProduct = new ValidatedMethod({
  name: 'recommendedProducts.addRecommendedProduct',
  validate: recommendedProductSchema.validator(),
  run(doc) {
    if (this.userId) {
      recommendedProducts.insert(doc);
      if (!this.isSimulation) {
        products.update(
          { variationId: doc.variationId },
          { $set: { display: false } }
        );
      }
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

const updateGender = new ValidatedMethod({
  name: 'recommendedProducts.updateGender',
  validate: new SimpleSchema({
    _id: { type: String },
    gender: { type: [String] },
  }).validator(),
  run({ _id, gender }) {
    if (this.userId) {
      recommendedProducts.update({ _id }, {
        $set: { gender },
      });
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

const updateSports = new ValidatedMethod({
  name: 'recommendedProducts.updateSports',
  validate: new SimpleSchema({
    _id: { type: String },
    sports: { type: [String] },
  }).validator(),
  run({ _id, sports }) {
    if (this.userId) {
      recommendedProducts.update({ _id }, {
        $set: { sports },
      });
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

const updateHours = new ValidatedMethod({
  name: 'recommendedProducts.updateHours',
  validate: new SimpleSchema({
    _id: { type: String },
    hours: { type: [String] },
  }).validator(),
  run({ _id, hours }) {
    if (this.userId) {
      recommendedProducts.update({ _id }, {
        $set: { hours },
      });
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

export { addRecommendedProduct, updateGender, updateSports, updateHours };
