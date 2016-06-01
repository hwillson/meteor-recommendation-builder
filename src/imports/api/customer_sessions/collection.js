import { Mongo, _ } from '../../utility/meteor/packages';
import customerSessionSchema from './schema.js';

const helpers = {
  questionAndAnswerFilter(questions) {
    // TODO - split this sucker up ...
    let filter = {};
    if (!_.isEmpty(this.answers)) {
      const queryValues = [];
      _.keys(this.answers).forEach((answeredQuestionId) => {
        let question;
        questions.forEach((loadedQuestion) => {
          if (loadedQuestion._id === answeredQuestionId) {
            question = loadedQuestion;
            return;
          }
        });
        if (question && question.matchKey) {
          const answers = _.without(this.answers[answeredQuestionId], 'all');
          if (question.matchExclusion) {
            queryValues.push({
              [question.matchKey]: {
                $nin: answers,
              },
            });
          } else {
            answers.forEach((answer) => {
              queryValues.push({
                [question.matchKey]: answer,
              });
            });
          }
        }
      });
      filter = {
        $and: queryValues,
      };
    }
    return filter;
  },
};

const customerSessions = new Mongo.Collection('customer_sessions', {
  transform(doc) {
    return _.extend(doc, helpers);
  },
});
customerSessions.attachSchema(customerSessionSchema);

customerSessions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default customerSessions;
