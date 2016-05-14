/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { findWithClass } from 'react-shallow-testutils';

import WizardAnswer
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardAnswer';

const answer = {
  answerId: 1,
  answer: 'Party time!',
};

describe('ui.builder.components.wizard.WizardAnswer', function () {
  it('should show answer content', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WizardAnswer answer={answer} />);
    const output = renderer.getRenderOutput();
    const renderedQuestion = findWithClass(output, 'wizard-answer-content');
    expect(renderedQuestion.props.children).to.equal(answer.answer);
  });
});
