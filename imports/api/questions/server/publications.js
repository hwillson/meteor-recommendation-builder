/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import questions from '../collection.js';

Meteor.publish('questions.all', function questionsAll() {
  let cursor;
  if (this.userId) {
    cursor = questions.find();
  } else {
    cursor = this.ready();
  }
  return cursor;
});
