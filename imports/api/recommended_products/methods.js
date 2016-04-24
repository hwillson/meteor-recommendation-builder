import { Meteor } from 'meteor/meteor';
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
      if (!recommendedProducts.findOne({ variationId: doc.variationId })) {
        recommendedProducts.insert(doc);
        if (!this.isSimulation) {
          products.update(
            { variationId: doc.variationId },
            { $set: { display: false } }
          );
        }
      } else {
        throw new Meteor.Error(
          'recommendedProducts.addRecommendedProduct.alreadyExists',
          'Product already recommended; ignoring this duplicate request.'
        );
      }
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

const removeRecommendedProduct = new ValidatedMethod({
  name: 'recommendedProducts.removeRecommendedProduct',
  validate: new SimpleSchema({
    _id: { type: String },
    variationId: { type: Number },
  }).validator(),
  run({ _id, variationId }) {
    if (this.userId) {
      recommendedProducts.remove({ _id });
      if (!this.isSimulation) {
        products.update(
          { variationId },
          { $set: { display: true } }
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

export {
  addRecommendedProduct,
  removeRecommendedProduct,
  updateGender,
  updateSports,
  updateHours,
};
