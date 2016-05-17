import { SimpleSchema } from '../../utility/meteor/packages';

const questionSchema = new SimpleSchema({
  label: {
    type: String,
  },
  question: {
    type: String,
  },
  summary: {
    type: String,
  },
  help: {
    type: String,
  },
  order: {
    type: Number,
  },
  maxAnswersAllowed: {
    type: Number,
    defaultValue: 1,
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
  'availableAnswers.$.imagePath': {
    type: String,
  }
});

export default questionSchema;
