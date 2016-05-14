/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { findWithClass, findAllWithType } from 'react-shallow-testutils';

import WizardQuestion
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardQuestion';
import WizardAnswer
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardAnswer';

const question = {
  question: 'What time is it?',
  availableAnswers: [
    {
      answerId: 1,
      answer: 'Party time!',
    },
    {
      answerId: 2,
      answer: 'Party, party time!',
    },
  ],
};

describe('ui.builder.components.wizard.WizardQuestion', function () {
  it('should show question content', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WizardQuestion question={question} />);
    const output = renderer.getRenderOutput();
    const renderedQuestion = findWithClass(output, 'wizard-question-title');
    expect(renderedQuestion.props.children).to.equal(
      question.question
    );
  });

  it('should show a list of available answers', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WizardQuestion question={question} />);
    const output = renderer.getRenderOutput();
    expect(findAllWithType(output, WizardAnswer).length).to.equal(2);
  });
});
