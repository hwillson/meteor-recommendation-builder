/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import StubCollections from 'meteor/hwillson:stub-collections';

import QuestionsContainer from './QuestionsContainer.js';
import questions from '/imports/api/questions/collection.js';

if (Meteor.isClient) {
  describe('ui.builder.containers.QuestionsContainer', function () {
    describe('createConainer', function () {
      beforeEach(function () {
        StubCollections.stub([questions]);
      });

      afterEach(function () {
        StubCollections.restore();
      });

      it(
        'should set loading to true if questions have not loaded yet',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return false;
              },
            };
          });
          const renderer = TestUtils.createRenderer();
          renderer.render(<QuestionsContainer />);
          const output = renderer.getRenderOutput();
          chai.expect(output.props.loading).to.be.true;
        })
      );

      it(
        'should set loading to false if questions have loaded',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return true;
              },
            };
          });
          const renderer = TestUtils.createRenderer();
          renderer.render(<QuestionsContainer />);
          const output = renderer.getRenderOutput();
          chai.expect(output.props.loading).to.be.false;
        })
      );

      it(
        'should set questionsExist to false if done loading but no questions '
        + 'are found',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return true;
              },
            };
          });
          const renderer = TestUtils.createRenderer();
          renderer.render(<QuestionsContainer />);
          const output = renderer.getRenderOutput();
          chai.expect(output.props.questionsExist).to.be.false;
        })
      );

      it(
        'should set questionsExist to true if done loading and questions are '
        + 'found',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return true;
              },
            };
          });
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
          chai.expect(output.props.questionsExist).to.be.true;
        })
      );

      it('should set loaded questions',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return true;
              },
            };
          });
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
          chai.expect(output.props.questions[0].label).to.equal('asdf');
        })
      );
    });
  });
}
