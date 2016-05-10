/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findWithType, findAllWithClass } from 'react-shallow-testutils';

import RecommendedProduct from './RecommendedProduct.js';
import RemoveRecommendedProductButton
  from './RemoveRecommendedProductButton.js';

const expect = chai.expect;

if (Meteor.isClient) {
  describe('ui.admin.components.recommended_products', function () {
    describe('RecommendedProduct', function () {
      it('should show product name, image and variation name', function () {
        const product = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          productImage: '/some/path/img.png',
        };
        const renderer = TestUtils.createRenderer();
        renderer.render(
          <RecommendedProduct product={product} questions={[]} />
        );
        const output = renderer.getRenderOutput();
        const imageHost = Meteor.settings.public.admin.products.imageHost;
        expect(findWithType(output, 'img').props.src).to.equal(
          `${imageHost}${product.productImage}`
        );
        expect(output.props.children[1].props.children).to.equal(
          product.productName
        );
        expect(output.props.children[2].props.children).to.equal(
          product.variationName
        );
      });

      it('should show remove button for each product', function () {
        const product = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          productImage: '/some/path/img.png',
        };
        const renderer = TestUtils.createRenderer();
        renderer.render(
          <RecommendedProduct product={product} questions={[]} />
        );
        const output = renderer.getRenderOutput();
        expect(
          findWithType(output, RemoveRecommendedProductButton)
        ).to.not.be.empty;
      });

      it('should show dropdown with answers for each question', function () {
        const product = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          productImage: '/some/path/img.png',
        };
        const questions = [
          {
            questionId: 'foods',
            label: 'Foods',
            availableAnswers: [
              { label: 'Pizza', value: 'pizza' },
              { label: 'Sushi', value: 'sushi' },
            ],
          },
          {
            questionId: 'color',
            label: 'Colors',
            availableAnswers: [
              { label: 'Red', value: 'red' },
              { label: 'Blue', value: 'blue' },
            ],
          },
        ];
        const renderer = TestUtils.createRenderer();
        renderer.render(
          <RecommendedProduct product={product} questions={questions} />
        );
        const output = renderer.getRenderOutput();
        expect(
          findAllWithClass(output, 'available-answers').length
        ).to.equal(2);
      });
    });
  });
}
