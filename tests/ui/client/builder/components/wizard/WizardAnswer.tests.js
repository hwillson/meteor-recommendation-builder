/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { findWithClass, findWithType } from 'react-shallow-testutils';
import td from 'testdouble';

import WizardAnswer
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardAnswer';

const answer = {
  answerId: 1,
  answer: 'Party time!',
  imagePath: '/images/test.png',
};

describe('ui.builder.components.wizard.WizardAnswer', function () {
  afterEach(function () {
    td.reset();
  });

  it('should show answer image and content', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WizardAnswer answer={answer} />);
    const output = renderer.getRenderOutput();
    const answerImage = findWithType(output, 'img');
    expect(answerImage.props.src).to.equal(answer.imagePath);
    const answerContent = findWithClass(output, 'wizard-answer-content');
    expect(answerContent.props.children).to.equal(answer.answer);
  });

  it(
    'should assign active answer styling to the answer if the "selected" '
    + 'prop value is true',
    function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(<WizardAnswer answer={answer} />);
      let output = renderer.getRenderOutput();
      expect(output.props.className.indexOf('selected-answer')).to.equal(-1);
      renderer.render(<WizardAnswer answer={answer} selected />);
      output = renderer.getRenderOutput();
      expect(output.props.className.indexOf('selected-answer')).to.not.equal(-1);
    }
  );

  it(
    'should call parent handleAnswerSelected(answerId, true) when clicked and '
    + 'not already selected',
    function () {
      const handleAnswerSelected = td.function();
      const renderedAnswer = TestUtils.renderIntoDocument(
        <WizardAnswer answer={answer}
          onAnswerSelected={handleAnswerSelected}
        />
      );
      const answerDiv = TestUtils.findRenderedDOMComponentWithClass(
        renderedAnswer,
        'wizard-answer'
      );
      TestUtils.Simulate.click(answerDiv);
      td.verify(handleAnswerSelected(td.matchers.anything(), true));
    }
  );

  it(
    'should call parent handleAnswerSelected(answerId, false) when clicked and '
    + 'already selected',
    function () {
      const handleAnswerSelected = td.function();
      const renderedAnswer = TestUtils.renderIntoDocument(
        <WizardAnswer answer={answer}
          onAnswerSelected={handleAnswerSelected}
          selected
        />
      );
      const answerDiv = TestUtils.findRenderedDOMComponentWithClass(
        renderedAnswer,
        'wizard-answer'
      );
      TestUtils.Simulate.click(answerDiv);
      td.verify(handleAnswerSelected(td.matchers.anything(), false));
    }
  );
});
