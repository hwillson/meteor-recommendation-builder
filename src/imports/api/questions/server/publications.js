/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import questions from '../collection.js';

Meteor.publish('questions.all', function questionsAll() {
  return questions.find();
});
