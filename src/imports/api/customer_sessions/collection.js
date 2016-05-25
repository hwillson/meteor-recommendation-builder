import { Mongo, _ } from '../../utility/meteor/packages';
import customerSessionSchema from './schema.js';

const customerSessions = new Mongo.Collection('customer_sessions');
customerSessions.attachSchema(customerSessionSchema);

customerSessions.helpers({
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
});

customerSessions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default customerSessions;
