/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'chai';
import td from 'testdouble';

import { Meteor, ValidatedMethod } from '../../../src/imports/utility/meteor/packages';

import { addRecommendedProduct } from '../../../src/imports/api/recommended_products/methods';
import recommendedProducts
  from '../../../src/imports/api/recommended_products/collection';
import products from '../../../src/imports/api/products/collection';

describe('api.recommended_products.methods', function () {
  describe('addRecommendedProduct', function () {
    afterEach(function () {
      td.reset();
    });

    it(
      'should be registered',
      function () {
        expect(addRecommendedProduct).to.be.defined;
        expect(addRecommendedProduct instanceof ValidatedMethod).to.be.true;
      }
    );

    it('should throw exception if input is invalid', function () {
      expect(() => addRecommendedProduct.call({})).to.throw(Error);
    });

    it(
      'should get a not authorized exception if called when not logged in',
      function () {
        td.replace(recommendedProducts, 'insert');
        const recommendedProduct = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          variationId: 123,
          productImage: '/some/path/img.png',
        };
        expect(() => addRecommendedProduct.call(recommendedProduct)).to.throw(
          Error
        );
      }
    );

    it(
      'should throw an exception if trying to add a recommended product that '
      + 'already exists',
      function () {
        const _collection = {
          findOne() {
            return true;
          },
        };
        td.replace(recommendedProducts, '_collection', _collection);
        const recommendedProduct = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          variationId: 123,
          productImage: '/some/path/img.png',
        };
        expect(() => {
          addRecommendedProduct._execute(
            { userId: 'abc123' },
            recommendedProduct
          );
        }).to.throw(Error);
      }
    );

    it(
      'should add a recommended product if logged in',
      function () {
        const _collection = {
          findOne() {
            return false;
          },
        };
        td.replace(recommendedProducts, '_collection', _collection);
        td.replace(recommendedProducts, 'insert');
        td.replace(products, 'update');
        const recommendedProduct = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          variationId: 123,
          productImage: '/some/path/img.png',
        };
        addRecommendedProduct._execute(
          { userId: 'abc123' },
          recommendedProduct
        );
        td.verify(recommendedProducts.insert(recommendedProduct));
      }
    );

    if (Meteor.isServer) {
      it(
        'should set display for associated product to false so it does not show '
        + 'in the available products modal',
        function () {
          const _collection = {
            findOne() {
              return false;
            },
          };
          td.replace(recommendedProducts, '_collection', _collection);
          td.replace(recommendedProducts, 'insert');
          td.replace(products, 'update');
          const recommendedProduct = {
            productName: 'Test Product',
            variationName: 'Test Variation',
            variationId: 123,
            productImage: '/some/path/img.png',
          };
          addRecommendedProduct._execute(
            { userId: 'abc123' },
            recommendedProduct
          );
          td.verify(products.update(
            { variationId: 123 },
            { $set: { display: false } }
          ));
        }
      );
    }
  });
});
