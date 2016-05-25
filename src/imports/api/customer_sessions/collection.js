import { Mongo, _ } from '../../utility/meteor/packages';
import customerSessionSchema from './schema.js';

const customerSessions = new Mongo.Collection('customer_sessions');
customerSessions.attachSchema(customerSessionSchema);

customerSessions.helpers({
  questionAndAnswerFilter(questions) {
    const filter = {};
    if (!_.isEmpty(this.answers)) {
      _.keys(this.answers).forEach((answeredQuestionId) => {
        let question;
        questions.forEach((loadedQuestion) => {
          if (loadedQuestion._id === answeredQuestionId) {
            question = loadedQuestion;
            return;
          }
        });
        if (question && question.matchKey) {
          const operator = question.matchExclusion ? '$nin' : '$in';
          filter[question.matchKey] = {
            [operator]: this.answers[answeredQuestionId],
          };
        }
      });
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
