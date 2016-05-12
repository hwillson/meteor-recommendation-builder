import { Meteor, ValidatedMethod, SimpleSchema } from '../../utility/meteor/packages';

import recommendedProductSchema from './schema.js';
import recommendedProducts from './collection.js';
import products from '../products/collection.js';
import throwNotAuthorizedException
  from '../../utility/exceptions/not_authorized.js';

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

const updateAnswers = new ValidatedMethod({
  name: 'recommendedProducts.updateAnswers',
  validate: new SimpleSchema({
    _id: { type: String },
    questionId: { type: String },
    answers: { type: [String] },
  }).validator(),
  run({ _id, questionId, answers }) {
    if (this.userId) {
      recommendedProducts.update(
        { _id },
        {
          $set: {
            [`matchedAnswers[${questionId}]`]: answers,
          },
        }
      );
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

export {
  addRecommendedProduct,
  removeRecommendedProduct,
  updateAnswers,
};
