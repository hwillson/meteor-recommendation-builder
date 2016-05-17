/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { findAllWithType, findWithRef } from 'react-shallow-testutils';

import WizardModal
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardModal';
import { WizardQuestion }
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardQuestion';

const seedQuestions = [
  {
    _id: 'a1',
    question: 'First question',
    help: 'Here is some help!',
    availableAnswers: [
      {
        answerId: 1,
        answer: 'Party time!',
      },
    ],
  },
  {
    _id: 'a2',
    question: 'Second question',
    help: 'Here is some help!',
    availableAnswers: [
      {
        answerId: 1,
        answer: 'Party time!',
      },
    ],
  },
];

const customerSession = {
  answers: {
    a1: [1],
  },
};

describe('ui.builder.components.wizard.WizardModal', function () {
  it('should be hidden by default', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardModal questions={seedQuestions}
        customerSession={customerSession}
      />
    );
    const output = renderer.getRenderOutput();
    expect(output.props.show).to.be.false;
  });

  it('should be visible when asked to show', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardModal questions={seedQuestions} showModal
        customerSession={customerSession}
      />
    );
    const output = renderer.getRenderOutput();
    expect(output.props.show).to.be.true;
  });

  it('should not attempt to show questions if none exist', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardModal questions={[]} customerSession={customerSession} />
    );
    const output = renderer.getRenderOutput();
    expect(findAllWithType(output, WizardQuestion).length).to.equal(0);
  });

  it('should show selected question', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardModal questions={seedQuestions}
        selectedQuestion={seedQuestions[1]} customerSession={customerSession}
      />
    );
    const output = renderer.getRenderOutput();
    const questions = findAllWithType(output, WizardQuestion);
    expect(questions.length).to.equal(1);
    expect(questions[0].props.question.question).to.equal(
      seedQuestions[1].question
    );
  });

  it('should show pagination links for each question', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardModal
        questions={seedQuestions} customerSession={customerSession}
      />
    );
    const output = renderer.getRenderOutput();
    const pagination = findWithRef(output, 'wizard-pagination');
    expect(pagination).to.not.be.undefined;
    expect(pagination.props.items).to.equal(2);
  });

  it(
    'should call parent to set current questions when clicking on page link, '
    + 'and set page link as active',
    function () {
      let onQuestionSelectionCalled = false;
      const onQuestionSelection = () => {
        onQuestionSelectionCalled = true;
      };
      const modal = TestUtils.renderIntoDocument(
        <WizardModal questions={seedQuestions}
          showModal customerSession={customerSession}
          onQuestionSelection={onQuestionSelection}
        />
      );
      const modalBody = document.body.getElementsByClassName('modal-body')[0];
      const pagination = modalBody.getElementsByClassName('pagination')[0];
      const secondPageLink = pagination.getElementsByTagName('a')[1];
      expect(onQuestionSelectionCalled).to.be.false;
      TestUtils.Simulate.click(secondPageLink);
      expect(onQuestionSelectionCalled).to.be.true;
      expect(modal.state.activePage).to.equal(2);
    }
  );
});
