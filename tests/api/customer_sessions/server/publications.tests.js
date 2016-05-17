/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'chai';
const fiber = require('fibers');

import {
  Factory,
  _,
  PublicationCollector,
} from '../../../../src/imports/utility/meteor/packages';

import customerSessions
  from '../../../../src/imports/api/customer_sessions/collection';
import '../../../../src/imports/api/customer_sessions/server/publications.js';

describe('api.customer_sessions.server.publications', function () {
  describe('customerSessions.single', function () {
    beforeEach(function () {
      Factory.define('customerSession', customerSessions, {
        answers: {},
      });
      _.times(3, (index) => {
        fiber(() => {
          Factory.create('customerSession', { _id: `abc${index}` });
        }).run();
      });
    });

    afterEach(function () {
      fiber(() => {
        customerSessions.remove({});
      }).run();
    });

    it(
      'should not publish a customer session if the session ID is missing',
      function () {
        const collector = new PublicationCollector();
        fiber(() => {
          collector.collect('customerSessions.single', (collections) => {
            expect(collections).to.be.empty;
          });
        }).run();
      }
    );

    it(
      'should publish a customer session matching the passed in session ID',
      function () {
        const collector = new PublicationCollector();
        fiber(() => {
          collector.collect(
            'customerSessions.single',
            'abc1',
            (collections) => {
              expect(collections.customer_sessions.length).to.equal(1);
            }
          );
        }).run();
      }
    );
  });
});
