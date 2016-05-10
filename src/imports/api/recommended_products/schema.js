/* global Package */

const SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;

const recommendedProductSchema = new SimpleSchema({
  productName: {
    type: String,
  },
  variationName: {
    type: String,
  },
  productImage: {
    type: String,
  },
  variationId: {
    type: Number,
  },
  matchedAnswers: {
    type: Object,
    defaultValue: {},
    optional: true,
  },
});

export default recommendedProductSchema;
