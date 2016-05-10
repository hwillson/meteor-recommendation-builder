/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { chai } from 'meteor/practicalmeteor:chai';
import TestUtils from 'react-addons-test-utils';
import { sinon } from 'meteor/practicalmeteor:sinon';

import RemoveRecommendedProductButton
  from './RemoveRecommendedProductButton.js';
import { removeRecommendedProduct }
  from '/imports/api/recommended_products/methods.js';

const expect = chai.expect;

if (Meteor.isClient) {
  describe('ui.admin.components.recommended_products', function () {
    describe('RemoveRecommendedProductButton', function () {
      describe('removeRecommendedProduct', function () {
        it(
          'should call remove recommended product method with id',
          sinon.test(function () {
            const _id = 'abc123';
            const variationId = 123;
            const renderer = TestUtils.createRenderer();
            renderer.render(
              <RemoveRecommendedProductButton _id={_id}
                variationId={variationId}
              />
            );
            const output = renderer.getRenderOutput();
            const callStub = this.stub(removeRecommendedProduct, 'call');
            output.props.onClick();
            expect(callStub.args[0][0]._id).to.equal(_id);
            expect(callStub.args[0][0].variationId).to.equal(variationId);
          })
        );
      });
    });
  });
}
