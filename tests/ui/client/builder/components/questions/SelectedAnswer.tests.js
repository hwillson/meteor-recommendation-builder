/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import td from 'testdouble';
import { findWithClass } from 'react-shallow-testutils';

import SelectedAnswer
  from '../../../../../../src/imports/ui/builder/components/questions/SelectedAnswer';

const customerSession = {
  answers: {},
};

describe('ui.builder.components.questions.SelectedAnswer', function () {
  afterEach(function () {
    td.reset();
  });

  it(
    'should show label prop as placeholder text',
    function () {
      const question = {
        label: 'asdf',
        content: 'asdf',
        order: 1,
        availableAnswers: [{
          answerId: 1,
          answer: 'asdf',
        }],
      };
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <SelectedAnswer
          question={question} handleShowHideWizardModal={() => {}}
          customerSession={customerSession}
        />
      );
      const output = renderer.getRenderOutput();
      expect(output.props.placeholder).to.equal(`Select ${question.label}`);
    }
  );

  it(
    'should blur selected answer input and open wizard modal on click ',
    function () {
      let showModal = false;
      const showHideModal = (show) => {
        showModal = show;
      };
      const renderedAnswer = TestUtils.renderIntoDocument(
        <SelectedAnswer
          question={{}} handleShowHideWizardModal={showHideModal}
          customerSession={customerSession}
        />
      );
      td.replace(renderedAnswer, 'unfocus');
      const input = TestUtils.findRenderedDOMComponentWithTag(
        renderedAnswer,
        'input'
      );
      td.verify(
        renderedAnswer.unfocus(),
        { times: 0, ignoreExtraArgs: true }
      );
      TestUtils.Simulate.click(input);
      td.verify(renderedAnswer.unfocus());
      expect(showModal).to.be.true;
    }
  );

  it(
    'should show selected answers as a link, combined into a sentence',
    function () {
      const question = {
        _id: 'q1',
        label: 'asdf',
        content: 'asdf',
        order: 1,
        availableAnswers: [{
          answerId: 1,
          answer: 'asdf',
        }, {
          answerId: 2,
          answer: 'asdf',
        }],
      };
      const testCustomerSession = {
        answers: {
          [question._id]: [1, 2],
        },
      };
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <SelectedAnswer
          question={question} handleShowHideWizardModal={() => {}}
          customerSession={testCustomerSession}
        />
      );
      const output = renderer.getRenderOutput();
      const link = findWithClass(output, 'selected-answer-link');
      expect(link.props.children).to.equal(
        `${question.availableAnswers[0].answer} and `
        + `${question.availableAnswers[1].answer}`
      );
    }
  );

  it(
    'should show modal when clicking on a selected answer link',
    function () {
      let showModal = false;
      const showHideModal = (show) => {
        showModal = show;
      };
      const question = {
        _id: 'q1',
        label: 'asdf',
        content: 'asdf',
        order: 1,
        availableAnswers: [{
          answerId: 1,
          answer: 'asdf',
        }, {
          answerId: 2,
          answer: 'asdf',
        }],
      };
      const testCustomerSession = {
        answers: {
          [question._id]: [1, 2],
        },
      };
      const renderedAnswer = TestUtils.renderIntoDocument(
        <SelectedAnswer
          question={question} handleShowHideWizardModal={showHideModal}
          customerSession={testCustomerSession}
        />
      );
      const link = TestUtils.findRenderedDOMComponentWithClass(
        renderedAnswer,
        'selected-answer-link'
      );
      expect(showModal).to.be.false;
      TestUtils.Simulate.click(link);
      expect(showModal).to.be.true;
    }
  );
});
