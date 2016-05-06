import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const questionSchema = new SimpleSchema({
  label: {
    type: String,
  },
  content: {
    type: String,
  },
  order: {
    type: Number,
  },
  availableAnswers: {
    type: [Object],
  },
  'availableAnswers.$.answerId': {
    type: Number,
  },
  'availableAnswers.$.answer': {
    type: String,
  },
});

export default questionSchema;
