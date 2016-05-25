import { SimpleSchema } from '../../utility/meteor/packages';

const questionSchema = new SimpleSchema({
  // Question placeholder label displayed in answer box when no answer
  // has been selected.
  label: {
    type: String,
  },
  // Question content shown at the top of a question page within the wizard
  // modal.
  question: {
    type: String,
  },
  // Question summary content shown on the question overview page.
  summary: {
    type: String,
  },
  // Question help content shown below the question content on a question page
  // within the wizard modal.
  help: {
    type: String,
    optional: true,
  },
  order: {
    type: Number,
  },
  mandatory: {
    type: Boolean,
  },
  maxAnswersAllowed: {
    type: Number,
    defaultValue: 1,
  },
  matchKey: {
    type: String,
    optional: true,
  },
  matchExclusion: {
    type: Boolean,
    optional: true,
    defaultValue: false,
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
    optional: true,
  },
});

export default questionSchema;
