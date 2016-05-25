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
        if (question) {
          const questionAnswers = this.answers[answeredQuestionId].map(
            (answerId) => question.getAnswerLabel(answerId)
          );
          const operator = question.matchExclusion ? '$nin' : '$in';
          filter[question.matchKey] = {
            [operator]: questionAnswers,
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
