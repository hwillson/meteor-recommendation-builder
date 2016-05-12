/* eslint-disable prefer-arrow-callback */

import { Meteor } from '../../../utility/meteor/packages';

import questions from '../collection.js';

Meteor.publish('questions.all', function questionsAll() {
  return questions.find();
});
