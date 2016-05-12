/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import {
  Meteor,
  StubCollections
} from '../../../../../src/imports/utility/meteor/packages';
import td from 'testdouble';

import QuestionsContainer
  from '../../../../../src/imports/ui/builder/containers/QuestionsContainer.js';
import questions from '../../../../../src/imports/api/questions/collection.js';

const imports = '../../../../../src/imports';

describe('ui.builder.containers.QuestionsContainer', function () {
  describe('createConainer', function () {
    beforeEach(function () {
      StubCollections.stub([questions]);
    });

    afterEach(function () {
      StubCollections.restore();
      td.reset();
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
  });
});
