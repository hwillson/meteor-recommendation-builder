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
import { _ } from '../../../../../../src/imports/utility/meteor/packages';

import QuestionsList
  from '../../../../../../src/imports/ui/builder/components/questions/QuestionsList';
import SelectedAnswer
  from '../../../../../../src/imports/ui/builder/components/questions/SelectedAnswer';

describe('ui.builder.components.questions.QuestionsList', function () {
  it(
    'should show a loading message if questions are not loaded yet',
    function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(<QuestionsList loading />);
      const output = renderer.getRenderOutput();
      expect(findWithClass(output, 'loading')).to.not.be.undefined;
    }
  );

  it(
    'should show a no questions message if no questions exist',
    function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <QuestionsList loading={false} questionsExist={false} />
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
        <QuestionsList loading={false} questionsExist
          questions={questions}
        />
      );
      const output = renderer.getRenderOutput();
      expect(findAllWithClass(output, 'question').length).to.equal(2);
      expect(
        findAllWithType(output, SelectedAnswer).length
      ).to.equal(2);
    }
  );
});
