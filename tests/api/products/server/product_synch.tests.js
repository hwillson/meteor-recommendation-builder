/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

// import { chai } from 'meteor/practicalmeteor:chai';
// import { sinon } from 'meteor/practicalmeteor:sinon';
// import { HTTP } from 'meteor/http';

// import productSynch from './product_synch.js';
// import products from '../collection.js';
// import recommendedProducts from '../../recommended_products/collection.js';


/*
import { expect } from 'chai';
import td from 'testdouble';

const validHttpGetResponse = () => {
  const responseData = [
    {
      productId: 123,
      productName: 'Test Product 1',
      productUrl: 'http://blah.com/some-product',
      productImage: 'http://blah.com/some-image',
      variationId: 456,
      variationName: 'Test Variation 1',
      status: 'active',
    },
    {
      productId: 123,
      productName: 'Test Product 1',
      productUrl: 'http://blah.com/some-product',
      productImage: 'http://blah.com/some-image',
      variationId: 789,
      variationName: 'Test Variation 2',
      status: 'active',
    },
  ];
  const response = {
    data: {
      success: true,
      data: JSON.stringify(responseData),
    },
  };
  return response;
};

const validHttpGetResponseWithInvalidProducts = () => {
  const responseData = [
    {
      productId: 123,
      productName: 'Test Product 1',
      productUrl: 'http://blah.com/some-product',
      productImage: 'http://blah.com/some-image',
      variationId: 456,
      variationName: 'Test Variation 1',
      status: 'active',
    },
    {
      productId: 123,
      productName: 'Test Product 1',
      productUrl: 'http://blah.com/some-product',
      variationName: 'Test Variation 2',
    },
  ];
  const response = {
    data: {
      success: true,
      data: JSON.stringify(responseData),
    },
  };
  return response;
};

describe('api.products.server.productSynch', function () {
  describe('run', function () {
    beforeEach(function () {
      const Meteor = td.object({});
      Meteor.settings = {
        private: {
          productSynch: {
            sourceUrl: 'blah.com',
          },
        },
      };
      const productSchema = td.object(['newContext', 'clean']);
      productSchema.newContext = function () {
        return {
          validate() {},
        };
      };
      const products = td.object(['insert', 'remove']);
      const recommendedProducts = td.object({});
      recommendedProducts.find = function () {
        return [];
      };
      td.replace('meteor/meteor', { Meteor });
      td.replace('../../../../imports/api/products/schema.js', productSchema);
      td.replace('../../../../imports/api/products/collection.js', products);
      td.replace(
        '../../../../imports/api/recommended_products/collection.js',
        recommendedProducts
      );
    });

    afterEach(function () {
      td.reset();
      const resolved = require.resolve(
        `${__dirname}/../../../../imports/api/products/server/product_synch.js`
      );
      delete require.cache[resolved];
    });

    it.only(
      'should return false on missing response failed synch',
      function () {
        const HTTP = td.object(['get']);
        td.replace('meteor/http', { HTTP });
        const productSynch = require(
          '../../../../imports/api/products/server/product_synch.js'
        ).default;
        const synchStatus = productSynch.run();
        expect(synchStatus.success).to.equal(false);
      }
    );

    it(
      'should return false if missing response data',
      function () {
        const HTTP = td.object(['get']);
        HTTP.get = function () {
          return { data: null };
        };
        td.replace('meteor/http', { HTTP });
        const productSynch = require(
          '../../../../imports/api/products/server/product_synch.js'
        ).default;
        const synchStatus = productSynch.run();
        expect(synchStatus.success).to.equal(false);
      }
    );

    it(
      'should return false if missing product data',
      function () {
        const HTTP = td.object(['get']);
        HTTP.get = function () {
          return {
            data: {
              data: null,
            },
          };
        };
        td.replace('meteor/http', { HTTP });
        const productSynch = require(
          '../../../../imports/api/products/server/product_synch.js'
        ).default;
        const synchStatus = productSynch.run();
        expect(synchStatus.success).to.equal(false);
      }
    );

    it(
      'should return false if product web service success flag is false',
      function () {
        const HTTP = td.object(['get']);
        HTTP.get = function () {
          return {
            data: {
              success: false,
            },
          };
        };
        td.replace('meteor/http', { HTTP });
        const productSynch = require(
          '../../../../imports/api/products/server/product_synch.js'
        ).default;
        const synchStatus = productSynch.run();
        expect(synchStatus.success).to.equal(false);
      }
    );

    it(
      'should return true if product data exists and product success flag is '
      + 'true',
      function () {
        const HTTP = td.object(['get']);
        HTTP.get = function () { return validHttpGetResponse(); };
        td.replace('meteor/http', { HTTP });
        const productSynch = require(
          '../../../../imports/api/products/server/product_synch.js'
        ).default;
        const synchStatus = productSynch.run();
        expect(synchStatus.success).to.equal(true);
      }
    );

    it(
      'should remove products before adding them again',
      function () {
        const HTTP = td.object(['get']);
        HTTP.get = function () { return validHttpGetResponse(); };
        td.replace('meteor/http', { HTTP });
        const products = td.object(['remove']);
        td.replace('../../../../imports/api/products/collection.js', products);
        const productSynch = require(
          '../../../../imports/api/products/server/product_synch.js'
        ).default;
        productSynch.run();
        td.verify(products.remove({}));
      }
    );

    it('should insert fetched products', function () {
      const HTTP = td.object(['get']);
      HTTP.get = function () { return validHttpGetResponse(); };
      td.replace('meteor/http', { HTTP });
      const products = td.object(['insert', 'remove']);
      td.replace('../../../../imports/api/products/collection.js', products);
      const productSchema = td.object(['newContext', 'clean']);
      productSchema.newContext = function () {
        return {
          validate() {
            return true;
          },
        };
      };
      td.replace('../../../../imports/api/products/schema.js', productSchema);
      const productSynch = require(
        '../../../../imports/api/products/server/product_synch.js'
      ).default;
      const synchStatus = productSynch.run();
      expect(synchStatus.fetchedProductCount).to.equal(2);
    });

//     it('should ignore invalid products', function () {
//
// // TODO ...
//
//       const HTTP = td.object(['get']);
//       HTTP.get = function () {
//         return validHttpGetResponseWithInvalidProducts();
//       };
//       td.replace('meteor/http', { HTTP });
//       const products = td.object(['insert', 'remove']);
//       td.replace('../../../../imports/api/products/collection.js', products);
//       const productSchema = td.object(['newContext', 'clean']);
//       productSchema.newContext = function () {
//         return {
//           validate() {
//             return true;
//           },
//         };
//       };
//       td.replace('../../../../imports/api/products/schema.js', productSchema);
//       const productSynch = require(
//         '../../../../imports/api/products/server/product_synch.js'
//       ).default;
//       const synchStatus = productSynch.run();
//       expect(synchStatus.fetchedProductCount).to.equal(1);
//     });

    // it(
    //   'should set display to false if product is a recommended product',
    //   sinon.test(function () {
    //     this.stub(HTTP, 'get', function () {
    //       return validHttpGetResponse();
    //     });
    //     this.stub(recommendedProducts, 'find', function () {
    //       return [{ variationId: 789 }];
    //     });
    //     const insertStub = this.stub(products, 'insert');
    //     productSynch.run();
    //     chai.expect(insertStub.getCall(0).args[0].display).to.be.true;
    //     chai.expect(insertStub.getCall(1).args[0].display).to.be.false;
    //   })
    // );
  });
});
*/
