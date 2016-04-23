import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const productSchema = new SimpleSchema({
  externalProductId: {
    type: Number,
  },
  productName: {
    type: String,
  },
  productUrl: {
    type: String,
  },
  productImage: {
    type: String,
  },
  variationId: {
    type: Number,
  },
  variationName: {
    type: String,
  },
  status: {
    type: String,
  },
});

export default productSchema;
