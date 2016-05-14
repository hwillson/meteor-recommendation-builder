/* global Package */

const SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;

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
  display: {
    type: Boolean,
    defaultValue: true,
  },
});

export default productSchema;