import { Mongo, _ } from '../../utility/meteor/packages';
import questionSchema from './schema.js';

const helpers = {
  getAnswerLabel(answerId) {
    let answerLabel;
    if (answerId) {
      this.availableAnswers.forEach((answer) => {
        if (answer.answerId === answerId) {
          answerLabel = answer.answer;
          return;
        }
      });
    }
    return answerLabel;
  },
};

const questions = new Mongo.Collection('questions', {
  transform(doc) {
    return _.extend(doc, helpers);
  },
});
questions.attachSchema(questionSchema);

questions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default questions;
