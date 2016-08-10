/* eslint-disable prefer-arrow-callback */

import { check } from 'meteor/check';
import { Meteor } from '../../../utility/meteor/packages';

import customerSessions from '../collection.js';

Meteor.publish(
  'customerSessions.single',
  function customerSessionsSingle(sessionId) {
    check(sessionId, String);
    return customerSessions.find({ _id: sessionId });
  }
);
