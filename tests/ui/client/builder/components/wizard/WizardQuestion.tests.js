/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { findWithClass, findAllWithType } from 'react-shallow-testutils';
import td from 'testdouble';

import { WizardQuestion, EventHandlers }
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardQuestion';
import WizardAnswer
  from '../../../../../../src/imports/ui/builder/components/wizard/WizardAnswer';
import { addAnswer, removeAnswer }
  from '../../../../../../src/imports/api/customer_sessions/methods';

const question = {
  _id: 'abc123',
  question: 'What time is it?',
  help: 'Here is some help!',
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

const customerSession = {
  answers: {
    abc123: [2],
  },
};

describe('ui.builder.components.wizard.WizardQuestion', function () {
  afterEach(function () {
    td.reset();
  });

  it('should show question content', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardQuestion question={question} customerSession={customerSession} />
    );
    const output = renderer.getRenderOutput();
    const renderedQuestion = findWithClass(output, 'wizard-question-title');
    expect(renderedQuestion.props.children).to.equal(
      question.question
    );
  });

  it('should show question help', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardQuestion question={question} customerSession={customerSession} />
    );
    const output = renderer.getRenderOutput();
    const renderedQuestion = findWithClass(output, 'wizard-question-help');
    expect(renderedQuestion.props.children).to.equal(question.help);
  });

  it('should show a list of available answers', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <WizardQuestion question={question} customerSession={customerSession} />
    );
    const output = renderer.getRenderOutput();
    expect(findAllWithType(output, WizardAnswer).length).to.equal(2);
  });

  it(
    'should set selected answers based on customer session answers',
    function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <WizardQuestion question={question} customerSession={customerSession} />
      );
      const output = renderer.getRenderOutput();
      const answers = findAllWithType(output, WizardAnswer);
      expect(answers.length).to.equal(2);
      expect(answers[0].props.selected).to.be.false;
      expect(answers[1].props.selected).to.be.true;
    }
  );

  it('should call addAnswer Method when an answer is selected', function () {
    const params = {
      currentAnswerCount: 2,
      maxAnswersAllowed: 4,
      sessionId: 'abc123',
      questionId: 'def123',
      answerId: 1,
      isSelected: true,
    };
    td.replace(addAnswer, 'call');
    EventHandlers.answerClicked(params);
    td.verify(addAnswer.call({
      sessionId: params.sessionId,
      questionId: params.questionId,
      answerId: params.answerId,
    }));
  });

  it('should call removeAnswer Method when an answer is deselected', function () {
    const params = {
      currentAnswerCount: 2,
      maxAnswersAllowed: 4,
      sessionId: 'abc123',
      questionId: 'def123',
      answerId: 1,
      isSelected: false,
    };
    td.replace(removeAnswer, 'call');
    EventHandlers.answerClicked(params);
    td.verify(removeAnswer.call({
      sessionId: params.sessionId,
      questionId: params.questionId,
      answerId: params.answerId,
    }));
  });

  it(
    'should return true (representing max answers reached) when trying to add '
    + 'more answers than allowed',
    function () {
      const params = {
        currentAnswerCount: 2,
        maxAnswersAllowed: 2,
        sessionId: 'abc123',
        questionId: 'def123',
        answerId: 1,
        isSelected: true,
      };
      expect(EventHandlers.answerClicked(params)).to.be.true;
    }
  );
});
