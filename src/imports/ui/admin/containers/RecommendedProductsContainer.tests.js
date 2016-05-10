/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import StubCollections from 'meteor/hwillson:stub-collections';

import RecommendedProductsContainer from './RecommendedProductsContainer.js';
import recommendedProducts
  from '/imports/api/recommended_products/collection.js';
import questions from '/imports/api/questions/collection.js';

if (Meteor.isClient) {
  describe('ui.admin.containers.RecommendedProductsContainer', function () {
    describe('createConainer', function () {
      beforeEach(function () {
        StubCollections.stub([recommendedProducts, questions]);
      });

      afterEach(function () {
        StubCollections.restore();
      });

      it(
        'should set loading to true if questions and products have not '
        + 'loaded yet',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return false;
              },
            };
          });
          const renderer = TestUtils.createRenderer();
          renderer.render(<RecommendedProductsContainer />);
          const output = renderer.getRenderOutput();
          chai.expect(output.props.loading).to.be.true;
        })
      );

      it(
        'should set loading to false if questions and products have loaded',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return true;
              },
            };
          });
          const renderer = TestUtils.createRenderer();
          renderer.render(<RecommendedProductsContainer />);
          const output = renderer.getRenderOutput();
          chai.expect(output.props.loading).to.be.false;
        })
      );

      it(
        'should set productsExist to false if done loading but no products are '
        + 'found',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return true;
              },
            };
          });
          const renderer = TestUtils.createRenderer();
          renderer.render(<RecommendedProductsContainer />);
          const output = renderer.getRenderOutput();
          chai.expect(output.props.productsExist).to.be.false;
        })
      );

      it(
        'should set productsExist to true if done loading and products are '
        + 'found',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return true;
              },
            };
          });
          recommendedProducts.insert({
            productName: 'asdf',
            variationName: 'asdf',
            productImage: 'asdf',
            variationId: 123,
          });
          questions.insert({
            questionId: 'asdf',
            label: 'asdf',
            content: 'asdf',
            order: 1,
            availableAnswers: [],
          });
          const renderer = TestUtils.createRenderer();
          renderer.render(<RecommendedProductsContainer />);
          const output = renderer.getRenderOutput();
          chai.expect(output.props.productsExist).to.be.true;
        })
      );

      it(
        'should set questionsExist to false if done loading but no questions '
        + 'are found',
        sinon.test(function () {
          this.stub(Meteor, 'subscribe', function () {
            return {
              ready() {
                return true;
              },
            };
          });
          const renderer = TestUtils.createRenderer();
          renderer.render(<RecommendedProductsContainer />);
          const output = renderer.getRenderOutput();
          chai.expect(output.props.questionsExist).to.be.false;
        })
      );
    });
  });
}
