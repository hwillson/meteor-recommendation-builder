/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import {
  findWithClass,
  findAllWithClass,
  findAllWithType,
} from 'react-shallow-testutils';
import { _ } from '../../../../../src/imports/utility/meteor/packages';

import QuestionsPage
  from '../../../../../src/imports/ui/builder/pages/QuestionsPage';
import SelectedAnswer
  from '../../../../../src/imports/ui/builder/components/questions/SelectedAnswer';

describe('ui.builder.pages.QuestionsPage', function () {
  it(
    'should show a loading message if questions are not loaded yet',
    function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(<QuestionsPage loading customerSession={{}} />);
      const output = renderer.getRenderOutput();
      expect(findWithClass(output, 'loading')).to.not.be.undefined;
    }
  );

  it(
    'should show a no questions message if no questions exist',
    function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <QuestionsPage
          loading={false} questionsExist={false} customerSession={{}}
        />
      );
      const output = renderer.getRenderOutput();
      expect(findWithClass(output, 'no-questions')).to.not.be.undefined;
    }
  );

  it(
    'should show questions and selected answer boxes if loaded',
    function () {
      const questions = [];
      _.times(2, () => {
        questions.push({
          label: 'asdf',
          content: 'asdf',
          order: 1,
          availableAnswers: [{
            answerId: 1,
            answer: 'asdf',
          }],
        });
      });
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <QuestionsPage loading={false} questionsExist
          questions={questions} customerSession={{}}
        />
      );
      const output = renderer.getRenderOutput();
      expect(findAllWithClass(output, 'question').length).to.equal(2);
      expect(
        findAllWithType(output, SelectedAnswer).length
      ).to.equal(2);
    }
  );

  it(
    'should set selected question to first question if none are selected',
    function () {
      const questions = [{ _id: 'a1' }, { _id: 'a2' }];
      const questionsPage = TestUtils.renderIntoDocument(
        <QuestionsPage loading={false} questionsExist
          questions={questions} customerSession={{}}
        />
      );
      expect(questionsPage.state.selectedQuestion).to.not.be.null;
      expect(questionsPage.state.selectedQuestion._id).to.equal(
        questions[0]._id
      );
    }
  );

    // it('should render first question if no selected question', function () {
    //   const renderer = TestUtils.createRenderer();
    //   renderer.render(
    //     <WizardModal
    //       questions={seedQuestions} customerSession={customerSession}
    //     />
    //   );
    //   const output = renderer.getRenderOutput();
    //   const questions = findAllWithType(output, WizardQuestion);
    //   expect(questions.length).to.equal(1);
    //   expect(questions[0].props.question.question).to.equal(
    //     seedQuestions[0].question
    //   );
    // });

});
