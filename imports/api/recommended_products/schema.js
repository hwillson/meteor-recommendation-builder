import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const recommendedProductSchema = new SimpleSchema({
  productName: {
    type: String,
  },
  gender: {
    type: [String],
  },
  sports: {
    type: [String],
  },
  hours: {
    type: [String],
  },
});

export default recommendedProductSchema;
