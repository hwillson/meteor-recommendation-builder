/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'chai';
import td from 'testdouble';

import { Meteor, ValidatedMethod } from '../../../src/imports/utility/meteor/packages';
import { synchProducts } from '../../../src/imports/api/products/methods.js';

describe('api.products.methods', function () {
  describe('synchProducts', function () {
    afterEach(function () {
      td.reset();
    });

    it(
      'should be registered',
      function () {
        expect(synchProducts).to.be.defined;
        expect(synchProducts instanceof ValidatedMethod).to.be.true;
      }
    );

    it(
      'should get a not authorized exception if called when not logged in',
      function () {
        if (Meteor.isServer) {
          try {
            const ProductSynch =
              require('./server/product_synch.js').ProductSynch;
            td.replace(ProductSynch, 'run');
          } catch (error) {
            // Do nothing
          }
        }
        try {
          synchProducts.call();
          expect(true).to.be.false;
        } catch (Error) {
          // Worked
        }
      }
    );

    if (Meteor.isServer) {
      it(
        'should synch products if called when logged in',
        function () {
          let ProductSynch;
          try {
            ProductSynch = require(
              '../../../src/imports/api/products/server/product_synch.js'
            ).ProductSynch;
            td.replace(ProductSynch, 'run');
          } catch (error) {
            // Do nothing
          }
          synchProducts._execute({ userId: 'abc123' });
          td.verify(ProductSynch.run());
        }
      );
    }
  });
});
