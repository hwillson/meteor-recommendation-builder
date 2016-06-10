/* eslint-disable prefer-arrow-callback */

import { Meteor } from '../../../utility/meteor/packages';

import experts from '../collection.js';

Meteor.publish('experts.single', function expertsSingle(expertId) {
  return experts.find({ _id: expertId });
});
