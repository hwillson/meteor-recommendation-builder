/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { sinon } from 'meteor/practicalmeteor:sinon';

import RecommendProductButton from './RecommendProductButton.js';
import { addRecommendedProduct }
  from '/imports/api/recommended_products/methods.js';

const expect = chai.expect;

if (Meteor.isClient) {
  describe('ui.admin.components.products', function () {
    describe('RecommendedProductButton', function () {
      describe('addProductToRecommendedList', function () {
        it(
          'should include all required product properties when adding '
          + 'recommended product',
          sinon.test(function () {
            const rowData = {
              productName: 'Test Product',
              variationName: 'Test Variation',
              variationId: 123,
              productImage: '/some/path/img.png',
            };
            const renderer = TestUtils.createRenderer();
            renderer.render(<RecommendProductButton rowData={rowData} />);
            const output = renderer.getRenderOutput();
            const callStub = this.stub(addRecommendedProduct, 'call');
            output.props.onClick();
            const params = callStub.args[0][0];
            expect(params.productName).to.equal(rowData.productName);
            expect(params.variationName).to.equal(rowData.variationName);
            expect(params.variationId).to.equal(rowData.variationId);
            expect(params.productImage).to.equal(rowData.productImage);
          })
        );
      });
    });
  });
}
