/* eslint-disable prefer-arrow-callback */

import { check } from 'meteor/check';
import { Meteor } from '../../../utility/meteor/packages';

import experts from '../collection.js';

Meteor.publish('experts.single', function expertsSingle(expertId) {
  check(expertId, String);
  return experts.find({ _id: expertId });
});
