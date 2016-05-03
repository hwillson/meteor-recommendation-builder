import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const questionSchema = new SimpleSchema({
  questionId: {
    type: String,
  },
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
});

export default questionSchema;
