import { Mongo } from 'meteor/mongo';
import questionSchema from './schema.js';

const questions = new Mongo.Collection('questions');
questions.attachSchema(questionSchema);

questions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default questions;
