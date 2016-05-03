/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findWithClass } from 'react-shallow-testutils';

import RecommendedProductsPage from './RecommendedProductsPage.js';

if (Meteor.isClient) {
  describe('ui.admin.components', function () {
    describe('RecommendedProductsPage', function () {
      it('should show the add a product button', function () {
        const data = {
          loading: null,
          products: null,
          productsExists: null,
        };
        const renderer = TestUtils.createRenderer();
        renderer.render(<RecommendedProductsPage {...data} />);
        const output = renderer.getRenderOutput();
        const button = findWithClass(output, 'add-product');
        chai.expect(button).to.not.be.empty;
      });
    });
  });
}
