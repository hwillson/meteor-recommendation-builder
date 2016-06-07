import { SimpleSchema } from '../../utility/meteor/packages';

const productSchema = new SimpleSchema({
  productId: {
    type: Number,
  },
  productName: {
    type: String,
  },
  productDescription: {
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
  variationPrice: {
    type: Number,
    decimal: true,
  },
  taxonomy: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  unitsSold: {
    type: Number,
  },
});

export default productSchema;
