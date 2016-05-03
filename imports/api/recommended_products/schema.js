import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
