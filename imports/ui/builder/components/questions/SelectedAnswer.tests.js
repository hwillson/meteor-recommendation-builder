/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import SelectedAnswer from './SelectedAnswer.js';

if (Meteor.isClient) {
  describe('ui.builder.components.questions.SelectedAnswer', function () {
    it(
      'should show label prop as placeholder text',
      function () {
        const label = 'Test!';
        const renderer = TestUtils.createRenderer();
        renderer.render(<SelectedAnswer label={label} />);
        const output = renderer.getRenderOutput();
        chai.expect(output.props.placeholder).to.equal(`Select ${label}`);
      }
    );

    it(
      'should blur selected answer input on click',
      sinon.test(function () {
        const blurStub = this.stub(ReactDOM, 'findDOMNode', () => {
          const stub = {
            blur() {},
          };
          return stub;
        });
        const selectedAnswer = TestUtils.renderIntoDocument(
          <SelectedAnswer />
        );
        const input = TestUtils.findRenderedDOMComponentWithTag(
          selectedAnswer,
          'input'
        );
        chai.expect(blurStub.callCount).to.equal(0);
        TestUtils.Simulate.click(input);
        chai.expect(blurStub.callCount).to.equal(1);
      })
    );
  });
}
