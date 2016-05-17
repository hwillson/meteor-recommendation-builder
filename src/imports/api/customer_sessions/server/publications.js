/* eslint-disable prefer-arrow-callback */

import { Meteor } from '../../../utility/meteor/packages';

import customerSessions from '../collection.js';

Meteor.publish(
  'customerSessions.single',
  function customerSessionsSingle(sessionId) {
    return customerSessions.find({ _id: sessionId });
  }
);
