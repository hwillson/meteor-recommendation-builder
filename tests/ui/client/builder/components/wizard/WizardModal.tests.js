/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { findAllWithType, findWithRef } from 'react-shallow-testutils';

import WizardModal
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardModal';
import WizardQuestion
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardQuestion';

const seedQuestions = [
  {
    _id: 'a1',
    question: 'First question',
  },
  {
    _id: 'a2',
    question: 'Second question',
  },
];

describe('ui.builder.components.wizard.WizardModal', function () {
  it('should be hidden by default', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WizardModal questions={seedQuestions} />);
    const output = renderer.getRenderOutput();
    expect(output.props.show).to.be.false;
  });

  it('should be visible when asked to show', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WizardModal questions={seedQuestions} showModal />);
    const output = renderer.getRenderOutput();
    expect(output.props.show).to.be.true;
  });

  it('should not attempt to show questions if none exist', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WizardModal questions={[]} />);
    const output = renderer.getRenderOutput();
    expect(findAllWithType(output, WizardQuestion).length).to.equal(0);
  });

  it('should render first question if no selected question', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WizardModal questions={seedQuestions} />);
    const output = renderer.getRenderOutput();
    const questions = findAllWithType(output, WizardQuestion);
    expect(questions.length).to.equal(1);
    expect(questions[0].props.question.question).to.equal(
      seedQuestions[0].question
    );
  });

  it.only(
    'should update the current question to the first one if no questions are '
    + 'passed in initially, but then come in later',
    function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(<WizardModal questions={[]} />);
      let output = renderer.getRenderOutput();
      expect(findAllWithType(output, WizardQuestion).length).to.equal(0);
      renderer.render(<WizardModal questions={seedQuestions} />);
      output = renderer.getRenderOutput();
      expect(findAllWithType(output, WizardQuestion).length).to.equal(1);
    }
  );

  it('should show selected question', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardModal questions={seedQuestions}
        selectedQuestion={seedQuestions[1]}
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
    renderer.render(<WizardModal questions={seedQuestions} />);
    const output = renderer.getRenderOutput();
    const pagination = findWithRef(output, 'wizard-pagination');
    expect(pagination).to.not.be.undefined;
    expect(pagination.props.items).to.equal(2);
  });

  it(
    'should set current question when clicking on page link and set page link '
    + 'as active',
    function () {
      const modal = TestUtils.renderIntoDocument(
        <WizardModal questions={seedQuestions}
          showModal
        />
      );
      const modalBody = document.body.getElementsByClassName('modal-body')[0];
      const pagination = modalBody.getElementsByClassName('pagination')[0];
      const secondPageLink = pagination.getElementsByTagName('a')[1];
      expect(modal.state.currentWizardQuestion._id).to.equal(
        seedQuestions[0]._id
      );
      TestUtils.Simulate.click(secondPageLink);
      expect(modal.state.currentWizardQuestion._id).to.equal(
        seedQuestions[1]._id
      );
      expect(modal.state.activePage).to.equal(2);
    }
  );
});
