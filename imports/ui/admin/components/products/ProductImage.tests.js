/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import ProductImage from './ProductImage.js';

if (Meteor.isClient) {
  const expect = chai.expect;
  describe('ui.admin.components.products', function () {
    describe('ProductImage', function () {
      it('should return a product img tag with proper host/path', function () {
        const imgPath = '/some/path/img.png';
        const renderer = TestUtils.createRenderer();
        renderer.render(<ProductImage data={imgPath} />);
        const output = renderer.getRenderOutput();
        expect(output.type).to.equal('img');
        expect(output.props.src).to.equal(
          `${Meteor.settings.public.admin.products.imageHost}/some/path/img.png`
        );
      });
    });
  });
}
