/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import td from 'testdouble';

import SelectedAnswer
  from '../../../../../../src/imports/ui/builder/components/questions/SelectedAnswer';

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
});