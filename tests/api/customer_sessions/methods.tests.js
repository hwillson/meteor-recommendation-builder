/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'chai';
import td from 'testdouble';
import {
  ValidatedMethod,
  createFiber,
  StubCollections,
} from '../../../src/imports/utility/meteor/packages';

import customerSessions
  from '../../../src/imports/api/customer_sessions/collection';
import {
  createCustomerSession,
  addAnswer,
  removeAnswer,
} from '../../../src/imports/api/customer_sessions/methods';

describe('api.customer_sessions.methods', function () {
  describe('createCustomerSession', function () {
    beforeEach(function () {
      StubCollections.stub([customerSessions]);
    });

    afterEach(function () {
      StubCollections.restore();
      td.reset();
    });

    it(
      'should be registered',
      function () {
        expect(createCustomerSession).to.be.defined;
        expect(createCustomerSession instanceof ValidatedMethod).to.be.true;
      }
    );

    it('should throw exception if input is invalid', function () {
      expect(() => createCustomerSession.call({})).to.throw(Error);
    });

    it(
      'should create a customer session if passed in data is valid, and '
      + 'return the new customer session ID',
      function () {
        expect(customerSessions.find().count()).to.equal(0);
        const customerSession = {
          answers: {},
        };
        createFiber(() => {
          createCustomerSession.call(customerSession);
        }).run();
        expect(customerSessions.find().count()).to.equal(1);
      }
    );
  });

  describe('addAnswer', function () {
    beforeEach(function () {
      StubCollections.stub([customerSessions]);
    });

    afterEach(function () {
      StubCollections.restore();
      td.reset();
    });

    it(
      'should be registered',
      function () {
        expect(addAnswer).to.be.defined;
        expect(addAnswer instanceof ValidatedMethod).to.be.true;
      }
    );

    it('should throw exception if input is invalid', function () {
      expect(() => addAnswer.call({})).to.throw(Error);
    });

    it(
      'should add question and answer customer session, if question/answer '
      + 'do not already exist',
      function () {
        const sessionId = 'abc123';
        const questionId = 'def321';
        const answerId = 2;

        customerSessions.insert({
          _id: sessionId,
          answers: {},
        });

        expect(
          customerSessions.findOne().answers[questionId]
        ).to.be.undefined;
        createFiber(() => {
          addAnswer.call({ sessionId, questionId, answerId });
        }).run();
        expect(
          customerSessions.findOne().answers[questionId]
        ).to.not.be.undefined;
        expect(
          customerSessions.findOne().answers[questionId].length
        ).to.equal(1);
      }
    );

    it(
      'should add answer to existing question in customer session, if answer '
      + 'does not already exist',
      function () {
        const sessionId = 'abc123';
        const questionId = 'def321';
        let answerId = 2;

        customerSessions.insert({
          _id: sessionId,
          answers: {
            [questionId]: [2, 3, 4],
          },
        });

        expect(
          customerSessions.findOne().answers[questionId].length
        ).to.equal(3);
        createFiber(() => {
          addAnswer.call({ sessionId, questionId, answerId });
        }).run();
        expect(
          customerSessions.findOne().answers[questionId].length
        ).to.equal(3);

        answerId = 1;
        createFiber(() => {
          addAnswer.call({ sessionId, questionId, answerId });
        }).run();
        expect(
          customerSessions.findOne().answers[questionId].length
        ).to.equal(4);
      }
    );
  });

  describe('removeAnswer', function () {
    beforeEach(function () {
      StubCollections.stub([customerSessions]);
    });

    afterEach(function () {
      StubCollections.restore();
      td.reset();
    });

    it(
      'should be registered',
      function () {
        expect(removeAnswer).to.be.defined;
        expect(removeAnswer instanceof ValidatedMethod).to.be.true;
      }
    );

    it('should throw exception if input is invalid', function () {
      expect(() => removeAnswer.call({})).to.throw(Error);
    });

    it(
      'should remove answer to question in customer session, if it exists',
      function () {
        const sessionId = 'abc123';
        const questionId = 'def321';
        let answerId = 1;

        customerSessions.insert({
          _id: sessionId,
          answers: {
            [questionId]: [2, 3, 4],
          },
        });

        expect(
          customerSessions.findOne().answers[questionId].length
        ).to.equal(3);
        createFiber(() => {
          removeAnswer.call({ sessionId, questionId, answerId });
        }).run();
        expect(
          customerSessions.findOne().answers[questionId].length
        ).to.equal(3);

        answerId = 2;
        createFiber(() => {
          removeAnswer.call({ sessionId, questionId, answerId });
        }).run();
        expect(
          customerSessions.findOne().answers[questionId].length
        ).to.equal(2);
      }
    );
  });
});
