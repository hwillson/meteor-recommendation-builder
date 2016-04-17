/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findWithClass } from 'react-shallow-testutils';

import ProductsPage from './ProductsPage.jsx';

if (Meteor.isClient) {
  describe('ui.admin.components', () => {
    describe('ProductsPage', () => {
      it('should show the add a product button', () => {
        const data = {
          loading: null,
          products: null,
          productsExists: null,
        };
        const renderer = TestUtils.createRenderer();
        renderer.render(<ProductsPage {...data} />);
        const output = renderer.getRenderOutput();
        const button = findWithClass(output, 'add-product');
        chai.expect(button).to.not.be.empty;
      });
    });
  });
}
