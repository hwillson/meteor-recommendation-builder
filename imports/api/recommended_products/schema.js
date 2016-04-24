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
  gender: {
    type: [String],
    optional: true,
  },
  sports: {
    type: [String],
    optional: true,
  },
  hours: {
    type: [String],
    optional: true,
  },
  variationId: {
    type: Number,
  },
});

export default recommendedProductSchema;
