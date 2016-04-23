/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findWithClass } from 'react-shallow-testutils';

import RecommendedProductList from './RecommendedProductList.jsx';

if (Meteor.isClient) {
  describe('ui.admin.components.recommended_products', function () {
    describe('RecommendedProductList', function () {
      it(
        'should show no products message if no products are loaded',
        function () {
          const props = {
            loading: false,
            products: [],
            productsExist: false,
          };
          const renderer = TestUtils.createRenderer();
          renderer.render(<RecommendedProductList {...props} />);
          const output = renderer.getRenderOutput();
          const content = findWithClass(output, 'no-products');
          chai.expect(content).to.not.be.empty;
        }
      );
    });
  });
}
