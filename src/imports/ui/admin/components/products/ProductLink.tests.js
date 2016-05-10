/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import ProductLink from './ProductLink.js';

if (Meteor.isClient) {
  const expect = chai.expect;
  describe('ui.admin.components.products', function () {
    describe('ProdutLink', function () {
      it('should return a product link tag with proper href', function () {
        const rowData = {
          externalProductId: 123,
        };
        const renderer = TestUtils.createRenderer();
        renderer.render(<ProductLink rowData={rowData} />);
        const output = renderer.getRenderOutput();
        expect(output.type).to.equal('a');
        expect(output.props.href).to.equal(
          `${Meteor.settings.public.admin.products.productUrl}`
          + `${rowData.externalProductId}`
        );
      });
    });
  });
}
