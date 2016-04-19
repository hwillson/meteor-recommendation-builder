import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const productSchema = new SimpleSchema({
  productId: {
    type: String,
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
    type: String,
  },
  variationName: {
    type: String,
  },
  status: {
    type: String,
  },
});

export default productSchema;
