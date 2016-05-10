/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'chai';
import td from 'testdouble';

describe('api.products.methods', function () {
  describe('synchProducts', function () {
    let synchProducts;
    const productSynch = td.object(['run']);
    const Meteor = {
      Error() {
        return new Error();
      },
      isServer: true,
    };
    const ValidatedMethod = td.function();

    beforeEach(function () {
      td.replace('meteor/meteor', { Meteor });
      td.replace('meteor/mdg:validated-method', { ValidatedMethod });
      td.replace(
        '../../../imports/api/products/server/product_synch.js',
        { default: productSynch }
      );
      synchProducts =
        require('../../../imports/api/products/methods.js').synchProducts;
    });

    afterEach(function () {
      td.reset();
    });

    it(
      'should get a not authorized exception if called when not logged in',
      function () {
        try {
          synchProducts.spec.run();
          expect(true).to.be.false;
        } catch (error) {
          // Worked
        }
      }
    );

    it('should synch products if called when logged in', function () {
      synchProducts.spec.userId = 'abc123';
      synchProducts.spec.run();
      td.verify(productSynch.run());
    });
  });
});
