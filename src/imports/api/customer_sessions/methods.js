import {
  ValidatedMethod,
  SimpleSchema,
  _,
} from '../../utility/meteor/packages';

import customerSessionSchema from './schema.js';
import customerSessions from './collection.js';

export const createCustomerSession = new ValidatedMethod({
  name: 'customerSessions.createCustomerSession',
  validate: customerSessionSchema.validator(),
  run(doc) {
    return customerSessions.insert(doc);
  },
});

export const addAnswer = new ValidatedMethod({
  name: 'customerSessions.addAnswer',
  validate: new SimpleSchema({
    sessionId: { type: String },
    questionId: { type: String },
    answerId: { type: String },
  }).validator(),
  run({ sessionId, questionId, answerId }) {
    const customerSession = customerSessions.findOne({ _id: sessionId });
    if (customerSession) {
      let answers = customerSession.answers[questionId];
      if (answers) {
        if (answers.indexOf(answerId) === -1) {
          answers.push(answerId);
        }
      } else {
        answers = [answerId];
      }
      customerSessions.update({
        _id: sessionId,
      }, {
        $set: {
          [`answers.${questionId}`]: answers,
        },
      });
    }
  },
});

export const removeAnswer = new ValidatedMethod({
  name: 'customerSessions.removeAnswer',
  validate: new SimpleSchema({
    sessionId: { type: String },
    questionId: { type: String },
    answerId: { type: String },
  }).validator(),
  run({ sessionId, questionId, answerId }) {
    const customerSession = customerSessions.findOne({ _id: sessionId });
    if (customerSession) {
      const answers = customerSession.answers[questionId];
      customerSessions.update({
        _id: sessionId,
      }, {
        $set: {
          [`answers.${questionId}`]: _.without(answers, answerId),
        },
      });
    }
  },
});

export const updateFreeTextAnswer = new ValidatedMethod({
  name: 'customerSessions.updateFreeTextAnswer',
  validate: new SimpleSchema({
    sessionId: { type: String },
    questionId: { type: String },
    answer: { type: String },
  }).validator(),
  run({ sessionId, questionId, answer }) {
    const customerSession = customerSessions.findOne({ _id: sessionId });
    if (customerSession) {
      const updatedAnswer = (answer) ? [answer] : [];
      customerSessions.update({
        _id: sessionId,
      }, {
        $set: {
          [`answers.${questionId}`]: updatedAnswer,
        },
      });
    }
  },
});
