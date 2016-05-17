/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import {
  Meteor,
  StubCollections,
  _,
} from '../../../../../src/imports/utility/meteor/packages';
import td from 'testdouble';

import { QuestionsContainer }
  from '../../../../../src/imports/ui/builder/containers/QuestionsContainer';
import questions from '../../../../../src/imports/api/questions/collection';
import customerSessions
  from '../../../../../src/imports/api/customer_sessions/collection';
import {
  createCustomerSession,
} from '../../../../../src/imports/api/customer_sessions/methods';

describe('ui.builder.containers.QuestionsContainer', function () {
  describe('createConainer', function () {
    beforeEach(function () {
      StubCollections.stub([questions, customerSessions]);
    });

    afterEach(function () {
      StubCollections.restore();
      td.reset();
      localStorage.removeItem('builder_customer_session_id');
    });

    it(
      'should set loading to true if questions have not loaded yet',
      function () {
        const subscribe = () => (
          {
            ready() {
              return false;
            },
          }
        );
        td.replace(Meteor, 'subscribe', subscribe);
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionsContainer />);
        const output = renderer.getRenderOutput();
        expect(output.props.loading).to.be.true;
      }
    );

    it(
      'should set loading to false if questions have loaded',
      function () {
        const subscribe = () => (
          {
            ready() {
              return true;
            },
          }
        );
        td.replace(Meteor, 'subscribe', subscribe);
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionsContainer />);
        const output = renderer.getRenderOutput();
        expect(output.props.loading).to.be.false;
      }
    );

    it(
      'should set questionsExist to false if done loading but no questions '
      + 'are found',
      function () {
        const subscribe = () => (
          {
            ready() {
              return true;
            },
          }
        );
        td.replace(Meteor, 'subscribe', subscribe);
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionsContainer />);
        const output = renderer.getRenderOutput();
        expect(output.props.questionsExist).to.be.false;
      }
    );

    it(
      'should set questionsExist to true if done loading and questions are '
      + 'found',
      function () {
        const subscribe = () => (
          {
            ready() {
              return true;
            },
          }
        );
        td.replace(Meteor, 'subscribe', subscribe);
        questions.insert({
          label: 'asdf',
          content: 'asdf',
          order: 1,
          availableAnswers: [{
            answerId: 1,
            answer: 'asdf',
          }],
        });
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionsContainer />);
        const output = renderer.getRenderOutput();
        expect(output.props.questionsExist).to.be.true;
      }
    );

    it('should set loaded questions',
      function () {
        const subscribe = () => (
          {
            ready() {
              return true;
            },
          }
        );
        td.replace(Meteor, 'subscribe', subscribe);
        questions.insert({
          label: 'asdf',
          content: 'asdf',
          order: 1,
          availableAnswers: [{
            answerId: 1,
            answer: 'asdf',
          }],
        });
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionsContainer />);
        const output = renderer.getRenderOutput();
        expect(output.props.questions[0].label).to.equal('asdf');
      }
    );

    it(
      'should pass empty customerSession to child while loading saved '
      + 'customerSession',
      function () {
        const readyStub = () => ({
          ready() {
            return false;
          },
        });
        td.replace(Meteor, 'subscribe', readyStub);
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionsContainer />);
        const output = renderer.getRenderOutput();
        const customerSession = output.props.customerSession;
        expect(_.keys(customerSession.answers).length).to.equal(0);
      }
    );

    it(
      'should create new customer session, store session ID in local storage, '
      + 'and pass new customer session object into child, if no customer '
      + 'session ID is found in local storage',
      function () {
        const sessionId = 'abc123';
        td.replace(createCustomerSession, 'call', () => sessionId);
        customerSessions.insert({ _id: sessionId, answers: {} });

        const readyStub = () => ({
          ready() {
            return true;
          },
        });
        td.replace(Meteor, 'subscribe', readyStub);

        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionsContainer />);
        const output = renderer.getRenderOutput();
        const customerSession = output.props.customerSession;
        expect(customerSession).to.not.be.undefined;
        expect(localStorage.getItem('builder_customer_session_id')).to.equal(
          customerSession._id
        );
      }
    );

    it(
      'should load and pass existing customer session to child if session '
      + 'id is stored in local storage',
      function () {
        const sessionId = 'abc123';
        localStorage.setItem('builder_customer_session_id', sessionId);
        customerSessions.insert({ _id: sessionId, answers: {} });

        const readyStub = () => ({
          ready() {
            return true;
          },
        });
        td.replace(Meteor, 'subscribe', readyStub);

        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionsContainer />);
        const output = renderer.getRenderOutput();
        const customerSession = output.props.customerSession;
        expect(customerSession).to.not.be.undefined;
        expect(localStorage.getItem('builder_customer_session_id')).to.equal(
          customerSession._id
        );
      }
    );
  });
});
