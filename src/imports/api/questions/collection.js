import { Mongo } from '../../utility/meteor/packages';
import questionSchema from './schema.js';

const questions = new Mongo.Collection('questions');
questions.attachSchema(questionSchema);

questions.helpers({
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
});

questions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default questions;
