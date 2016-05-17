import { SimpleSchema } from '../../utility/meteor/packages';

const customerSessionSchema = new SimpleSchema({
  customerName: {
    type: String,
    optional: true,
  },
  answers: {
    type: Object,
    blackbox: true,
  },
});

export default customerSessionSchema;
